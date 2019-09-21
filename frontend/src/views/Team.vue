<template>
<v-container>
    {{team}}
    <h2>Tämän kauden yleisömäärät</h2>
    <SeasonAttendanceChart v-if="loaded" :attendances="homeAttendances" :dates="dates"></SeasonAttendanceChart>
    {{longestWinStreak}}
    {{points}}
    <table>
        <tr v-for="(game, index) in matches" v-bind:key="index">
            <td>{{game.date}}</td>
            <td>{{game.hometeam}}</td>
            <td>{{game.awayteam}}</td>
            <td>{{game.homegoals}}</td>
            <td>-</td>
            <td>{{game.awaygoals}}</td>
        </tr>
    </table>
</v-container>
</template>

<script>
import axios from "axios"
import SeasonAttendanceChart from "@/components/attendance/SeasonAttendanceChart.vue"

export default {
  components: {
      SeasonAttendanceChart
  },
  data() {
      return {
          matches: [],
          loaded: false
      }
  },
  computed: {
      longestWinStreak() {
          var winStreak = 0
          var longestStreak = 0
          var m = this.matches
          for (var i = 0; i < m.length; i++) {
              if (m[i].hometeam == this.$route.params.team && m[i].homegoals > m[i].awaygoals) {
                  winStreak += 1
              } else if (m[i].awayteam == this.$route.params.team && m[i].homegoals < m[i].awaygoals) {
                  winStreak += 1
              } else {
                  if (longestStreak < winStreak) {
                      longestStreak = winStreak
                  }
              }
          }
          return longestStreak
      },
      points() {
          var points = []
          var avgs = [] 
          var m = this.matches
          for (var i = 0; i < m.length; i++) {
              if (m[i].hometeam.trim() == this.$route.params.team && m[i].homegoals > m[i].awaygoals) {
                  points += 3
              } else if (m[i].awayteam.trim() == this.$route.params.team && m[i].homegoals < m[i].awaygoals) {
                  points += 3
              } else if ((m[i].awayteam.trim() == this.$route.params.team || m[i].hometeam.trim() == this.$route.params.team) && m[i].awaygoals == m[i].homegoals) {
                  points += 1
              } else {
              }
          }
          return points
      },
      dates() {
          var m = this.matches
          var d = []
          for (var i = 0; i < m.length; i++) {
              if (m[i].hometeam == this.$route.params.team) {
                  d.push(m[i].date)
              }
          }
          console.log(d)
          return d
      },
      homeAttendances() {
          var m = this.matches
          var d = []
          for (var i = 0; i < m.length; i++) {
              if (m[i].hometeam == this.$route.params.team) {
                  d.push(m[i].attendance)
              }
          }
          console.log(d)
          return d
      }
  },
  mounted() {
      this.team = this.$route.params.team
      this.getMatches()
  },
  methods: {
      getMatches() {
          axios.get("/seasonMatches", {
            params: {
              year: new Date().getFullYear(),
              team: this.$route.params.team
            }
          }).then(response => {
            this.matches = response.data
            console.log(response.data)
            this.loaded = true
          })
      }
  }
};
</script>
