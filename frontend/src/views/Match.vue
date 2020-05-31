<template>
    <MatchDetails :matchId="parseInt($route.params.id)"></MatchDetails>
</template>
<script>
import MatchDetails from '@/components/matches/MatchDetails.vue'
export default {
    name: "Match",
    components: {
        MatchDetails
    },
    mounted() {
        console.log(this.$route.params.id)
    }
}
</script>