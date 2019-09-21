<template>
<v-container>
  <div>
      <v-row>
          <v-col>
              <div>Team 1 logo</div>
              <div class="firstteam"><router-link :to="{ name: 'team', params: { team: firstTeam }}">{{ firstTeam }}</router-link></div>
          </v-col>
          <v-col>
              <div>Team 2 logo</div>
              <div class="secondteam"><router-link :to="{ name: 'team', params: { team: secondTeam }}">{{ secondTeam }}</router-link></div>
          </v-col>
      </v-row>
      <VersusChart v-if="matches.length > 0" :fTeam="firstTeam" :sTeam="secondTeam" :data="score"></VersusChart>
      <div>{{score[0]}} - {{score[1]}} - {{score[2]}}</div>
  </div>
  <div class="matchhistory">
      <h2>Ottelut kahden joukkueen välillä!</h2>
      <div v-for="(match, index) in matches" v-bind:key="index">
          <VersusMatch :match="match"></VersusMatch>
      </div>
  </div>
</v-container>
</template>

<script>
import axios from "axios"
import VersusMatch from "@/components/versus/VersusMatch.vue"
import VersusChart from "@/components/versus/VersusChart.vue"

export default {
  name: 'home',
  components: {
      VersusMatch,
      VersusChart
  },
  computed: {
      score() {
          var duals = this.matches
          var firstWins = 0
          var draws = 0
          var secondWins = 0
          for (var i = 0; i < duals.length; i++) {

              //If home team has won the game
              if (duals[i].homegoals > duals[i].awaygoals) {
                  if (duals[i].hometeam == this.firstTeam) {
                      firstWins += 1
                  } else {
                      secondWins += 1
                  }
            
              //If away team has won the game
              } else if (duals[i].homegoals < duals[i].awaygoals) {
                  if (duals[i].awayteam == this.firstTeam) {
                      firstWins += 1
                  } else {
                      secondWins += 1
                  }

              //Else it has been a draw
              } else {
                  draws += 1
              }
          }
          var obj = [secondWins, draws, firstWins]
          return obj
      },
      today() {
          var date = new Date()
          return {day: date.getDate(), month: date.getMonth() + 1}
      },
  },
  data() {
      return {
          firstTeam: "",
          secondTeam: "",
          matches: []
      }
  },
  mounted() {
    this.firstTeam = this.$route.params.team1
    this.secondTeam = this.$route.params.team2
    this.getMatches()
  },
  methods: {
    getMatches() {
      axios.get("/matchesbetween", {
          params: {
              team1: this.$route.params.team1,
              team2: this.$route.params.team2
          }
      }).then(response => {
        this.matches = response.data
      })
    }
  }
}
</script>
<style scoped>
.firstteam {
    border-bottom: 3px solid #f87979;
}
.secondteam {
    border-bottom: 3px solid #1867C0;
}
</style>
