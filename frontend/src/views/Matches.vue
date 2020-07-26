<template>
    <v-container>
        <v-row>
            <v-col sm="12" md="4">
                <v-card outlined class="pa-3">
                    <v-tabs
                        v-model="tab"
                        icons-and-text
                        centered
                        dark
                    >
                        <v-tab href="#tab-1">
                            Most
                            <v-icon>mdi-trending-up</v-icon>
                        </v-tab>
                        <v-tab href="#tab-2">
                            Least
                            <v-icon>mdi-trending-down</v-icon>
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1">
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    label="Most goals"
                                    :value="0"
                                ></v-radio>
                                
                                <v-radio
                                    label="Most goals at day"
                                    :value="1"
                                ></v-radio>
                            </v-radio-group>
                        </v-tab-item>
                        <v-tab-item
                            value="tab-2"
                        >
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    label="Least goals by date"
                                    :value="3"
                                ></v-radio>
                            </v-radio-group>
                        </v-tab-item>
                    </v-tabs-items>
                    Others
                    <v-radio-group v-model="radioGroup">
                        <v-radio
                            label="Last matches"
                            :value="4"
                        ></v-radio>
                        <v-radio
                            label="Biggest wins"
                            :value="5"
                        ></v-radio>
                        <v-radio
                            :label="'Average goal scored by season'"
                            :value="6"
                        >
                        </v-radio>
                    </v-radio-group>
                    
                    Inspect
                    <v-select 
                        v-if="radioGroup === 0 || radioGroup === 2 || (radioGroup >= 4 && radioGroup <= 6)" 
                        v-model="chosenTeam" 
                        :items="teams" 
                        label="Team" 
                        item-text="name" 
                        clearable>
                    </v-select>
                    <v-range-slider
                        v-model="range"
                        :max="2019"
                        :min="1990"
                        hide-details
                        thumb-label="always"
                        :thumb-size="27"
                        class="align-center mt-6"
                    >       
                    </v-range-slider>
                </v-card>
            </v-col>
            <v-col sm="12" md="8">
                <v-card outlined class="pa-3">
                    Attendances
                    <div v-if="!radioGroup || radioGroup === 0 || radioGroup === 2 || (radioGroup >= 4 && radioGroup <= 5)">
                        <v-data-table
                            :headers="matchHeaders"
                            :items="matches"
                            :items-per-page="10"
                            class="elevation-1"
                        >
                            <template v-slot:item.date="{ item }">
                                <a @click="$router.push({name: 'date', params: { date: getYYYYMMDD(item.date) }})">{{ new Date(item.date).toLocaleDateString('fi-FI') }}</a>
                            </template>
                            <template v-slot:item.hometeam="{ item }">
                                <div>
                                    <img height="30" style="vertical-align:middle" v-if="$store.getters.logo(item.hometeam, new Date(item.date).getFullYear())" :src="$store.getters.logo(item.hometeam, new Date(item.date).getFullYear())">
                                    <span style="margin-left: 3px">{{item.hometeam}}</span>
                                </div>
                            </template>
                            <template v-slot:item.awayteam="{ item }">
                                <div>
                                    <img height="30" style="vertical-align:middle" v-if="$store.getters.logo(item.awayteam, new Date(item.date).getFullYear())" :src="$store.getters.logo(item.awayteam, new Date(item.date).getFullYear())">
                                    <span style="margin-left: 3px">{{item.awayteam}}</span>
                                </div>
                            </template>
                            <template v-slot:item.result="{ item }">
                                <a @click="$router.push({name: 'match', params: { id: item.id}})">{{ item.homegoals }} - {{ item.awaygoals }}</a>
                            </template>
                            
                        </v-data-table>
                    </div>
                    <div v-if="radioGroup === 1 || radioGroup === 3">
                        <v-data-table
                            :headers="dayHeaders"
                            :items="matches"
                            :expanded.sync="expanded"
                            :single-expand="true"
                            :items-per-page="10"
                            item-key="date"
                            show-expand
                        >
                            <template v-slot:item.date="{ item }">
                                {{ new Date(item.date).toLocaleDateString('fi-FI') }}
                            </template>
                            <template v-slot:expanded-item="{ headers, item }">
                                <td :colspan="headers.length">
                                    <v-container>
                                        <v-row>
                                            <v-col md="4" sm="4" v-for="(match, index) in dailyMatches" v-bind:key="index">
                                                <HistoricalMatch :match="match" :randomYear="new Date(match.date).getFullYear()"></HistoricalMatch>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </td>
                            </template>
                        </v-data-table>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from "axios"
import HistoricalMatch from "@/components/history/HistoricalMatch.vue"
export default {
    name: "Matches",
    components: {
        HistoricalMatch
    },
    data() {
        return {
            teams: [],
            averages: [],
            seasons: [],
            range: [1990, 2019],
            radioGroup: null,
            expanded: [],
            chosenTeam: null,
            chosenYear: null,
            groupBy: false,
            matchHeaders: [
                { text: 'Date', value: 'date'},
                { text: 'Home team', value: 'hometeam'},
                { text: 'Away team', value: 'awayteam'},
                { text: 'Result', value: 'result'},
                { text: 'Attendance', value: 'attendance'}
            ],
            averageHeaders: [
                {text: 'Logo', width: "3%", sortable: false, value: 'logo'},
                {text: 'Club', value: 'hometeam'},
                {text: 'Average', value: 'average'},
                {text: 'Season', value: 'year'}
            ],
            alltimeAveragesHeaders: [
                {text: 'Logo', width: "3%", sortable: false, value: 'logo'},
                {text: 'Club', value: 'hometeam'},
                {text: 'Average', value: 'average'}
            ],
            matchMaxHeaders: [
                {text: 'Logo', width: "3%", sortable: false, align: 'center', value: 'logo'},
                {text: 'Club', value: 'hometeam'},
                {text: 'Attendance', value: 'attendance'},
                {text: 'Date', value: 'date'},
                {text: 'Versus', value: 'awayteam'},
                {text: 'Result', sortable: false, value: 'result'}
            ],
            seasonHeaders: [
                {text: 'Season', value: 'season'},
                {text: 'Average', value: 'average'}
            ],
            dayHeaders: [
                {text: 'Date', value: 'date'},
                {text: 'Goals', value: 'goals'},
                {text: 'Matches', value: 'matches'},
                { text: '', value: 'data-table-expand' },
            ],
            matches: [],
            dailyMatches: [],
            tab: null
        }
    },
    watch: {
        expanded() {
            if (this.expanded.length > 0) {
                this.getMatchesAt(this.expanded[0].date)
            }
        },
        chosenTeam() {
            if (this.radioGroup === 0) {
                this.getAlltimeHighestAttendances()
            } else if (this.radioGroup === 8) {
                this.getAverageAttendancesBySeasons()
            }
            
        },
        radioGroup() {
            if (this.radioGroup === 0) {
                this.getMatchesWithMostGoals()
            } else if (this.radioGroup == 1) {
                this.getMostGoalsDaily()
            } else if (this.radioGroup == 3) {
                this.getLeastGoalsDaily()
            } else if (this.radioGroup == 4) {
                this.getLastMatches()
            } else if (this.radioGroup == 5) {
                this.getBiggestWins()
            } 
        }
    },
    mounted() {
        this.getTeams()
        this.getLastMatches()
    },
    methods: {
        getYYYYMMDD(item) {
            return new Date(item).getFullYear() + '-' + (new Date(item).getMonth() + 1 < 10 ? '0' + (parseInt(new Date(item).getMonth()) + 1) : (parseInt(new Date(item).getMonth()) + 1))  + '-' + (new Date(item).getDate() < 10 ? '0' + new Date(item).getDate() : new Date(item).getDate())
        },
        getTeams() {
            axios.get("/teams").then(response => {
                this.teams = response.data
            })
        },
        getMatchesWithMostGoals() {
            axios.get("/most-goals-match").then(response => {
                this.matches = response.data
            })
        },
        getLastMatches() {
            axios.get("/last-matches").then(response => {
                this.matches = response.data
            })
        },
        getMostGoalsDaily() {
            axios.get("/mostgoalsonmatchday").then(response => {
                this.matches = response.data
            })
        },
        getLeastGoalsDaily() {
            axios.get("/leastgoalsonmatchday").then(response => {
                this.matches = response.data
            })
        },
        getBiggestWins() {
            axios.get("/biggest-wins").then(response => {
                this.matches = response.data
            })
        },
        getMatchesAt(date) {
            if (date) {
                var dateObject = new Date(date)
                axios.get("/matcheson", {params: {
                    day: dateObject.getDate(),
                    month: dateObject.getMonth() + 1,
                    year: dateObject.getFullYear()
                }}).then(response => {
                    this.dailyMatches = response.data
                })
            }
        }
    }
}
</script>