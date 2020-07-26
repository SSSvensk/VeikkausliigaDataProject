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
        <v-col>
          <img v-if="$store.getters.logo(match.hometeam, randomYear)" :src="$store.getters.logo(match.hometeam, randomYear)">
          <div v-else>LOGO</div>
        </v-col>
        <v-col>
          
        </v-col>
        <v-col>
          <img v-if="$store.getters.logo(match.awayteam, randomYear)" :src="$store.getters.logo(match.awayteam, randomYear)">
          <div v-else>LOGO</div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  name: 'ComingMatch',
  props: {
      match: Object,
      randomYear: Number
  },
  methods: {
    goToVersus() {
    }
  }
}
</script>
<style scoped>
img {
  display: block;
  max-width:50px;
  max-height:50px;
  width: auto;
  height: auto;
}
</style>
