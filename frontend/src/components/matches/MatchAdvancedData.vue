<template>
    <div>moi</div>
</template>
<script>
import axios from "axios"

export default {
    name: "MatchAdvancedData",
    props: {
        year: Number,
        id: Number
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
            })
        }
    }
}
</script>