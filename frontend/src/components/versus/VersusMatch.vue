<template>
  <v-card>
      <div>{{formatedDate}}</div>
      <div>{{match.hometeam}} - {{match.awayteam}}</div>
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
  computed: {
    formatedDate() {
      return new Date(this.match.date)
    }
    
  },
  
}
</script>
