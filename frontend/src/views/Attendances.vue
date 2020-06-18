<template>
    <v-container>
        <v-row>
            <v-col sm="12" md="4">
                <v-card outlined class="pa-3">
                    Search
                    <v-radio-group v-model="radioGroup">
                        <v-radio
                            label="Clubs with highest alltime attendances"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Highest attendance by clubs"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Show the matches with highest attendances"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Show the seasons with highest total average"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Show the seasons with highest average by team"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Show the dates with highest averages"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Show the distribution by week day"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Show the distribution by month"
                            :value="0"
                        ></v-radio>
                        <v-radio
                            label="Show the distribution by season"
                            :value="0"
                        ></v-radio>
                    </v-radio-group>
                    <v-select v-model="chosenTeam" :items="[1,2,3]" label="Team"></v-select>
                    <v-select v-model="chosenYear" :items="[1,2,3]" label="Season"></v-select>
                    <v-btn>Compare</v-btn>
                </v-card>
            </v-col>
            <v-col sm="12" md="8">
                <v-card outlined class="pa-3">
                    Attendances
                    <div v-if="groupBy"></div>
                    <div v-else>
                        <v-data-table
                            :headers="matchHeaders"
                            :items="matches"
                            :items-per-page="10"
                            class="elevation-1"
                        >
                            <template v-slot:item.date="{ item }">
                                {{ new Date(item.date).toLocaleDateString('fi-FI') }}
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
export default {
    name: "Attendances",
    data() {
        return {
            radioGroup: null,
            chosenTeam: null,
            chosenYear: null,
            groupBy: false,
            matchHeaders: [
                { text: 'Date', value: 'date'},
                { text: 'Home team', value: 'hometeam'},
                { text: 'Away team', value: 'awayteam'},
                { text: 'Home goals', value: 'homegoals'},
                { text: 'Away goals', value: 'awaygoals'},
                { text: 'Attendance', value: 'attendance'}
            ],
            matches: []
        }
    },
    watch: {
        radioGroup() {
            if (this.radioGroup == 0) {
                this.getAlltimeHighestAttendances()
            }
        }
    },
    methods: {
        getAlltimeHighestAttendances() {
            axios.get("/highestAttendances").then(response => {
                this.matches = response.data
            })
        }
    }
}
</script>