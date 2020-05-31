<template>
  <v-card outlined>
      <div class="text-center">{{new Date(formatedDate).toLocaleDateString('fi-FI')}}</div>
      <div class="text-center">{{match.hometeam}} - {{match.awayteam}}</div>
      <h2 class="text-center">{{match.homegoals}} - {{match.awaygoals}}</h2>
      <div class="text-center">{{match.attendance}}</div>
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
