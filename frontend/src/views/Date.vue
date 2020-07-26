<template>
    <v-container>
        <v-row>
            <v-col sm="6" md="8">
                Matches on {{ new Date(date).toLocaleDateString('fi-FI') }}
                <v-container v-if="matches.length > 0">
                    <v-row v-if="new Date(date) > new Date()">
                        <v-col>
                            <ComingMatch></ComingMatch>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col sm="12" md="4" v-for="(match, index) in matches" v-bind:key="index">
                            <HistoricalMatch :match="match" :randomYear="parseInt(date.split('-')[0])"></HistoricalMatch>
                        </v-col>
                    </v-row>
                    <v-row v-if="new Date(date) < new Date()">
                        <v-col>
                        <h2>Key numbers</h2>
                        <div>Average attendance of the date: {{ averageOfDate }}</div>
                        </v-col>
                        
                    </v-row>
                </v-container>
            </v-col>
            <v-col sm="6" md="4">
                Standings
                <v-tabs v-model="tab">
                    <v-tab>Before</v-tab>
                    <v-tab>After</v-tab>
                    <v-tab-item>
                        <Standings 
                            :snapshotDate="previousDate"
                            :compactView="true"
                        >
                        </Standings>
                    </v-tab-item>
                    <v-tab-item>
                        <Standings 
                            :snapshotDate="date"
                            :compactView="true"
                        >
                        </Standings>
                    </v-tab-item>
                </v-tabs>
                
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from "axios"
import HistoricalMatch from "@/components/history/HistoricalMatch.vue"
import ComingMatch from "@/components/matches/ComingMatch.vue"
import Standings from '@/components/standings/Standings.vue'

export default {
    name: "Date",
    components: {
        HistoricalMatch,
        ComingMatch,
        Standings
    },
    data() {
        return {
            tab: 1,
            matches: []
        }
    },
    computed: {
        averageOfDate() {
            var attendances = this.matches.map(x => x.attendance)
            return attendances.reduce((a, b) => a + b, 0) / this.matches.length
        },
        date() {
            return this.$route.params.date 
        },
        previousDate() {
            var newDate = new Date(new Date(this.date).getTime() - 86400000)
            const years = newDate.getFullYear()
            const getMonth = newDate.getMonth() + 1
            const months = getMonth < 10 ? '0' + getMonth : getMonth
            const getDate = newDate.getDate()
            const days = getDate < 10 ? '0' + getDate : getDate
            return years + '-' + months + '-' + days
        }
    },
    mounted() {
        this.getMatchesOnThisDate()
    },
    methods: {
        getMatchesOnThisDate() {
            axios.get('/matcheson', {
                params: {
                    day: this.date.split("-")[2],
                    month: this.date.split("-")[1],
                    year: this.date.split("-")[0]
                }
            })
            .then(response => {
                this.matches = response.data
            })
        }
    }
}
</script>