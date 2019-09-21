<template>
  <v-card>
      <div><a @click="goToVersus()">{{match.hometeam}} - {{match.awayteam}}</a></div>
      <div>{{match.homegoals}} - {{match.awaygoals}}</div>
      <div>{{match.attendance}}</div>
  </v-card>
</template>

<script>

export default {
  name: 'historicalMatch',
  props: {
      match: Object
  },
  methods: {
    goToVersus() {
      this.$router.push({name: 'versus', params: { team1: this.match.hometeam, team2: this.match.awayteam}});
    }
  }
}
</script>
