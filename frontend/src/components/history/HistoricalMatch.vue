<template>
  <v-card outlined>
    <v-container>
      <v-row class="mt-n4">
        <v-col>
          <div class="text-center">
            <a @click="$router.push({name: 'match', params: { id: match.id}})">{{match.hometeam}} - {{match.awayteam}}</a>
          </div>
        </v-col>
      </v-row>
      <v-row class="text-center mt-n4 mb-n4">
        <v-col>LOGO</v-col>
        <v-col>
          <div>{{match.homegoals}} - {{match.awaygoals}}</div>
          <div>{{match.attendance}}</div>
        </v-col>
        <v-col>LOGO</v-col>
      </v-row>
    </v-container>
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
