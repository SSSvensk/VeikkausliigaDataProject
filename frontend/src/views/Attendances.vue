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
                            Highest
                            <v-icon>mdi-trending-up</v-icon>
                        </v-tab>
                        <v-tab href="#tab-2">
                            Lowest
                            <v-icon>mdi-trending-down</v-icon>
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1">
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    label="Highest attendances"
                                    :value="0"
                                ></v-radio>
                                <v-radio
                                    label="Club attendance records"
                                    :value="1"
                                ></v-radio>
                                <v-radio
                                    label="Highest season attendance averages"
                                    :value="2"
                                ></v-radio>
                                <v-radio
                                    label="Highest average attendance by date"
                                    :value="3"
                                ></v-radio>
                            </v-radio-group>
                        </v-tab-item>
                        <v-tab-item
                            value="tab-2"
                        >
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    label="Lowest attendances"
                                    :value="4"
                                ></v-radio>
                                <v-radio
                                    label="Lowest club attendance records"
                                    :value="5"
                                ></v-radio>
                                <v-radio
                                    label="Lowest season attendance averages"
                                    :value="6"
                                ></v-radio>
                                <v-radio
                                    label="Lowest average attendance by date"
                                    :value="7"
                                ></v-radio>
                            </v-radio-group>
                        </v-tab-item>
                    </v-tabs-items>
                    Others
                    <v-radio-group v-model="radioGroup">
                        <v-radio
                            :label="'Season averages'"
                            :value="8"
                        >
                        </v-radio>
                        <v-radio
                            :label="'Alltime averages by club'"
                            :value="9"
                        >
                        </v-radio>
                    </v-radio-group>
                    
                    Inspect
                    <v-select 
                        v-if="radioGroup === 0 || radioGroup === 4 || radioGroup === 8" 
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
                    <div v-if="radioGroup === 0 || radioGroup === 4">
                        <v-data-table
                            :headers="matchHeaders"
                            :items="matches"
                            :items-per-page="10"
                            class="elevation-1"
                        >
                            <template v-slot:item.date="{ item }">
                                {{ new Date(item.date).toLocaleDateString('fi-FI') }}
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
                    <div v-if="radioGroup === 1 || radioGroup === 5">
                        moi
                        <v-data-table
                            :headers="matchMaxHeaders"
                            :items="matches"
                            :items-per-page="10"
                            class="elevation-1"
                        >
                            <template v-slot:item.logo="{ item }">
                                <img height="30" style="vertical-align:middle" v-if="$store.getters.logo(item.hometeam, new Date().getFullYear())" :src="$store.getters.logo(item.hometeam, new Date().getFullYear())">
                            </template>
                            <template v-slot:item.hometeam="{ item }">
                                {{ item.hometeam }}
                            </template>
                            <template v-slot:item.date="{ item }">
                                {{ new Date(item.date).toLocaleDateString('fi-FI') }}
                            </template>
                            <template v-slot:item.result="{ item }">
                                {{ item.homegoals }} - {{ item.awaygoals }}
                            </template>
                        </v-data-table>
                    </div>
                    <div v-if="radioGroup === 2">
                        <v-data-table
                            :headers="averageHeaders"
                            :items="matches"
                            :items-per-page="10"
                            class="elevation-1"
                        >
                            <template v-slot:item.logo="{ item }">
                                <img height="30" style="vertical-align:middle" v-if="$store.getters.logo(item.hometeam, new Date().getFullYear())" :src="$store.getters.logo(item.hometeam, new Date().getFullYear())">
                            </template>
                        </v-data-table>
                    </div>
                    <div v-if="radioGroup === 3 || radioGroup === 7">
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
                    <div v-if="radioGroup === 8">
                        <v-data-table
                            :headers="seasonHeaders"
                            :items="seasons"
                            :items-per-page="10"
                            class="elevation-1"
                        >
                        </v-data-table>
                    </div>
                    <div v-if="radioGroup === 9">
                        <v-data-table
                            :headers="alltimeAveragesHeaders"
                            :items="averages"
                            :items-per-page="10"
                            class="elevation-1"
                        >
                            <template v-slot:item.logo="{ item }">
                                <img height="30" style="vertical-align:middle" v-if="$store.getters.logo(item.hometeam, new Date().getFullYear())" :src="$store.getters.logo(item.hometeam, new Date().getFullYear())">
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
    name: "Attendances",
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
                {text: 'Average', value: 'average'},
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
            if (this.radioGroup == 0) {
                this.getAlltimeHighestAttendances()
            } else if (this.radioGroup == 1) {
                this.getHighestAttendanceByClubs()
            } else if (this.radioGroup == 2) {
                this.getHighestAttendanceAverages()
            } else if (this.radioGroup == 3) {
                this.getDatesWithHighestAverageAttendances()
            } else if (this.radioGroup === 4) {
                this.getAlltimeLowestAttendances()
            } else if (this.radioGroup === 5) {
                this.getLowestAttendanceByClubs()
            } else if (this.radioGroup === 7) {
                this.getDatesWithLowestAverageAttendances()
            } else if (this.radioGroup === 8) {
                this.getAverageAttendancesBySeasons()
            } else if (this.radioGroup === 9) {
                this.getAlltimeAttendanceAveragesByClub()
            }
        }
    },
    mounted() {
        this.getTeams()
    },
    methods: {
        getTeams() {
            axios.get("/teams").then(response => {
                this.teams = response.data
            })
        },
        getAverageAttendancesBySeasons() {
            axios.get("/attendance-averages-by-season", {
                params: {
                    team: this.chosenTeam
                }
            }).then(response => {
                this.seasons = response.data
            })
        },
        getAlltimeHighestAttendances() {
            axios.get("/highestAttendances", {
                params: {
                    from: this.range[0],
                    to: this.range[1],
                    team: this.chosenTeam
                }
            }).then(response => {
                this.matches = response.data
            })
        },
        getHighestAttendanceByClubs() {
            axios.get("/highestattendancebyclub").then(response => {
                this.matches = response.data
            })
        },
        getHighestAttendanceAverages() {
            axios.get("/highestaverageattendances").then(response => {
                this.matches = response.data
            })
        },
        getDatesWithHighestAverageAttendances() {
            axios.get("/bestdailyattendances").then(response => {
                this.matches = response.data
            })
        },
        getAlltimeLowestAttendances() {
            axios.get("/lowestAttendances").then(response => {
                this.matches = response.data
            })
        },
        getLowestAttendanceByClubs() {
            axios.get("/worstattendancebyclub").then(response => {
                this.matches = response.data
            })
        },
        getDatesWithLowestAverageAttendances() {
            axios.get("/worstdailyattendances").then(response => {
                this.matches = response.data
            })
        },
        getAlltimeAttendanceAveragesByClub() {
            axios.get("/alltime-attendance-averages").then(response => {
                this.averages = response.data
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