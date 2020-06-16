<template>
    <v-container>
        <v-row>
            <v-col sm="12" md="4">
                <v-card class="pa-3" outlined>
                    <div class="text-center">
                        {{new Date(matchData.date).toLocaleDateString('fi-FI')}}
                    </div>
                    <v-container class="text-center">
                        <v-row>
                            <v-col>{{matchData.hometeam}}</v-col>
                            <v-col>{{matchData.awayteam}}</v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h2>{{matchData.homegoals}}</h2>
                            </v-col>
                            <v-col>
                                <h2>{{matchData.awaygoals}}</h2>
                            </v-col>
                        </v-row>
                    </v-container>
                    <div class="text-center">
                        Yleisömäärä: {{ matchData.attendance }}
                    </div>
                <div class="mb-3 mt-3">
                    <v-icon>mdi-open-in-new</v-icon>
                    <a :href="linkToVeikkausLiiga">Ottelu Veikkausliigan sivuilla</a>
                </div>
                <hr>
                <v-btn @click="$router.push({name: 'versus', params: { team1: matchData.hometeam, team2: matchData.awayteam }})" class="mt-3" tile depressed color="primary">Keskinäiset kohtaamiset</v-btn>
                </v-card>
            </v-col>
            <v-col sm="12" md="8">
                <MatchAdvancedData v-if="Object.keys(matchData).length > 0 && matchData.constructor === Object" :year="new Date(matchData.date).getFullYear()" :id="matchId"></MatchAdvancedData>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from "axios"
import MatchAdvancedData from '@/components/matches/MatchAdvancedData.vue'

export default {
    name: "MatchDetails",
    props: {
        matchId: Number,
    },
    components: {
        MatchAdvancedData
    },
    data() {
        return {
            matchData: {}
        }
    },
    computed: {
        linkToVeikkausLiiga() {
            if (Object.keys(this.matchData).length > 0 && this.matchData.constructor === Object) {
                return "http://www.veikkausliiga.com/tilastot/" + this.matchData.date.split("-")[0] + "/veikkausliiga/ottelut/" + this.matchData.id + "/tilastot/"
            } else {
                return ""
            }
            
        }
    },
    mounted() {
        this.getMatchData()
    },
    methods: {
        getMatchData() {
            axios.get("/matchbasicdata", {
                params: {
                    id: this.matchId
                }
            })
            .then(response => {
                this.matchData = response.data[0]
            })
        }
    }
}
</script>
<style scoped>

</style>