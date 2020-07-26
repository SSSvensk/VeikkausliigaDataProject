<template>
    <div>
        <div v-if="loaded">
            <v-container>
                <div v-if="matches.length > 0">
                    <h2 v-if="new Date(matches[0].date) == new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()">
                        Matches today {{ new Date(matches[0].date).toLocaleDateString('fi-FI') }}!
                    </h2>
                    <div v-else>
                        <h2>Next matches on {{ new Date(matches[0].date).toLocaleDateString('fi-FI') }}</h2>
                        <span>(In x days)</span>
                    </div>
                </div>
                
                <v-row v-if="matches.length > 0">
                    <v-col sm="6" v-for="(match, index) in matches" v-bind:key="index" randomYear="">
                        <ComingMatch :match="match" :randomYear="new Date().getFullYear()"></ComingMatch>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col sm="6" v-for="(match, index) in matches" v-bind:key="index" randomYear="">
                       No matches
                    </v-col>
                </v-row>
            </v-container>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import ComingMatch from "@/components/matches/ComingMatch.vue"

export default {
    name: "NextMatches",
    components: {
        ComingMatch
    },
    data() {
        return {
            matches: [],
            loaded: true
        }
    },
    mounted() {
        this.getNextMatches()
    },
    methods: {
        getNextMatches() {
            this.loaded = false
            axios.get("/next-matches").then(response => {
                if (response.data.length > 0) {
                    var firstDayMatches = response.data.filter(x => x.date == response.data[0].date)
                    this.matches = firstDayMatches
                }
                
                this.loaded = true
                
            })
        }
    }
}
</script>