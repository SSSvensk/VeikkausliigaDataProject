<template>
    <div>
        <v-btn @click="updateCurrentSeason()">Update current season</v-btn>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "Admin",
    methods: {
        updateCurrentSeason() {
            axios.get("/updateseasonmatches", { params: {
                year: 2020
            }}).then(response => {
                console.log(response)
            })
        }
    }
}
</script>