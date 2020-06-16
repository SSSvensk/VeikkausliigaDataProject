<template>
    <v-card outlined class="pa-3">
        <div class="text-center" v-if="Object.keys(advancedData).length === 0 && advancedData.constructor === Object">
            Loading...
        </div>
        <div v-else>
            {{ advancedData }}
        </div>
    </v-card>
</template>
<script>
import axios from "axios"

export default {
    name: "MatchAdvancedData",
    props: {
        year: Number,
        id: Number
    },
    data() {
        return {
            advancedData: {}
        }
    },
    mounted() {
        this.getAdvancedData()
    },
    methods: {
        getAdvancedData() {
            axios.get("/match", {
                params: {
                    year: this.year,
                    id: this.id
                }
            })
            .then(response => {
                console.log(response)
                this.advancedData = response.data
            })
        }
    }
}
</script>