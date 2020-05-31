<template>
    <v-container>
        <v-row>
            {{matchData}}
        </v-row>
        <v-row v-if="Object.keys(matchData).length > 0 && matchData.constructor === Object">
            <MatchAdvancedData :year="new Date(matchData.date).getFullYear()" :id="matchId"></MatchAdvancedData>
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