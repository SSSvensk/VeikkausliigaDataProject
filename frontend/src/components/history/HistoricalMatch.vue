<template>
  <v-card class="mb-3 text-center" outlined>
      <div><a @click="$router.push({name: 'match', params: { id: match.id}})">{{match.hometeam}} - {{match.awayteam}}</a></div>
      <div>{{match.homegoals}} - {{match.awaygoals}}</div>
      <div>{{match.attendance}}</div>
      {{match.id}}
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
    }
  }
}
</script>
