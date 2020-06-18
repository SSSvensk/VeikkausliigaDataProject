<template>
<v-container>
    <v-row class="text-center">
        <v-col><h1>{{team}}</h1></v-col>
    </v-row>
    <v-row class="text-center">
        <v-col>
            <div>Seasons in Veikkausliiga</div>
            {{ seasons.length }}
        </v-col>
        <v-col>
            <div>Best position</div>
            {{ bestPosition }}
        </v-col>
        <v-col>
            <div v-if="playsStill">
                <div>Plays still!</div>
                <div>Current position: x</div>
            </div>
            <div v-else>
                <div>Doesn't play anymore</div>
                <div>Club was relegated in xxxx</div>
            </div>
        </v-col>
        <v-col v-if="gold > 0 || silver > 0 || bronze > 0" class="text-center">
            <table style="margin-right: auto; margin-left: auto;">
                <tr>
                    <td v-if="gold > 0"><v-icon large color="#FFDF00">mdi-trophy</v-icon></td>
                    <td v-if="silver > 0"><v-icon large color="#C0C0C0">mdi-trophy</v-icon></td>
                    <td v-if="bronze > 0"><v-icon large color="#cd7f32">mdi-trophy</v-icon></td>
                </tr>
                <tr>
                    <td v-if="gold > 0">{{gold}}</td>
                    <td v-if="silver > 0">{{silver}}</td>
                    <td v-if="bronze > 0">{{bronze}}</td>
                </tr>
            </table>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <h2 class="text-left">Matches</h2>
            <div>
                <span>Next matches</span>
                <div v-if="matches.filter(x => new Date(x.date) > Date.now()).length > 0">
                    <v-card outlined v-for="(game, index) in matches.filter(x => new Date(x.date) > Date.now()).slice(0, 5)" v-bind:key="index">
                        {{ game }}
                    </v-card>
                </div>
                <div v-else>
                    <v-card outlined class="pa-3">
                        No coming matches
                    </v-card>
                </div>
            </div>
            <div class="mt-4">
                <span>Last matches</span>
                <v-card class="mb-2" outlined v-for="(game, index) in matches.filter(x => new Date(x.date) < Date.now()).slice(0, 5)" v-bind:key="index">
                    <div class="text-center">
                        <div>{{ game.weekday + " " + new Date(game.date).toLocaleDateString('fi-FI') }}</div>
                        <div>{{game.hometeam}} - {{game.awayteam}}</div>
                        <div>{{ game.homegoals }} - {{game.awaygoals}}</div>
                        <div>{{ game.attendance }}</div>
                    </div>
                </v-card>
            </div>
            
        </v-col>
        <v-col>
            <h2 class="text-left">Attendances</h2>
            <v-icon>mdi-file-chart</v-icon>
            <v-radio-group v-model="byYear">
                <v-radio
                    :key="0"
                    :label="'Kaikkien aikojen yleisökeskiarvot'"
                    :value="false"
                ></v-radio>
                <v-radio
                    :key="1"
                    :label="'Kauden mukaan'"
                    :value="true"
                ></v-radio>
            </v-radio-group>
            <div v-if="loaded">
                <SeasonAttendanceChart :attendances="alltimeAttendanceAverages" :averages="alltimeVeikkausliigaAverages" :dates="seasons"></SeasonAttendanceChart>
                <div>
                    <h3>Highest attendances</h3>
                </div>
            </div>
            <div v-else>
                loading
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <h2>Positions</h2>
            <div v-if="loaded">
            <HistoryStandings :positions="teamPositions" :teams="overallTeams" :labels="seasons"></HistoryStandings>
            </div>
        </v-col>
        <v-col>Sijat</v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from "axios"
import standingsMixin from '@/mixins/standingsMixin.js'
import SeasonAttendanceChart from "@/components/attendance/SeasonAttendanceChart.vue"
import HistoryStandings from "@/components/standings/HistoryStandings.vue"

export default {
    name: "Team",
    components: {
        SeasonAttendanceChart,
        HistoryStandings
    },
    mixins: [standingsMixin],
    data() {
        return {
            matches: [],
            loaded: false,
            byYear: false,
            allMatches: []
        }
    },
    computed: {
        playsStill() {
            return true
        },
        gold() {
            var golds = this.teamPositions.filter(x => x == 1)
            return golds.length
        },
        silver() {
            var silvers = this.teamPositions.filter(x => x == 2)
            return silvers.length
        },
        bronze() {
            var bronzes = this.teamPositions.filter(x => x == 3)
            return bronzes.length
        },
        alltimeStandingsForTeam() {
            var tmp = []
            this.seasons.forEach(year => {
                var standings = this.getStandings(this.allMatches.filter(x => x.date.split("-")[0] == year))
                tmp.push(standings)
            })
            return tmp
        },
        overallTeams() {
          var teams = []
          this.alltimeStandingsForTeam.forEach(standings => {
              teams.push(standings.length)
          })
          return teams
      },
      teamPositions() {
          var positions = []
          this.alltimeStandingsForTeam.forEach(standings => {
              for (var i = 0; i < standings.length; i++) {
                  if (standings[i].name == this.team) {
                      positions.push(i+1)
                  }
              }
          })
          return positions
      },
      bestPosition() {
          var best = 9999999
          this.teamPositions.forEach(position => {
                if (position < best) {
                    best = position
                }
          })
          return best
      },
      team() {
          return this.$route.params.team
      },
      dates() {
          var m = this.matches
          var d = []
          for (var i = 0; i < m.length; i++) {
              if (m[i].hometeam == this.$route.params.team) {
                  d.push(m[i].date)
              }
          }
          return d
      },
      alltimeVeikkausliigaAverages() {
          var averages = []
          this.seasons.forEach(year => {
              var seasonMatches = this.allMatches.filter(x => x.date.split("-")[0] == year)
              var attendances = seasonMatches.map(y => y.attendance)
              
              averages.push(Math.round(attendances.reduce((a,b) => a + b) / seasonMatches.length))
          });
          return averages
      },
      alltimeAttendanceAverages() {
          var averages = []
          this.seasons.forEach(year => {
              var seasonMatches = this.matches.filter(x => x.date.split("-")[0] == year && this.team == x.hometeam)
              var attendances = seasonMatches.map(y => y.attendance)
              
              averages.push(Math.round(attendances.reduce((a,b) => a + b) / seasonMatches.length))
          });
          return averages
      },
      highestAttendances() {

      },
      seasons() {
          return [...new Set(this.matches.map(item => item.date.split("-")[0]))].reverse()
      }
  },
  mounted() {
      Promise.all([this.getMatches(), this.getAllMatches()]).then(() => {
          this.loaded = true
      })
      .catch(e => {
          console.log("virhe")
      })
  },
  methods: {
      getMatches() {
          return new Promise((resolve, reject) => {
              axios.get("/matchesbyteam", {
                params: {
                    team: this.$route.params.team
                }
            }).then(response => {
                this.matches = response.data
                resolve()
            })
          })
      },
      getAllMatches() {
          return new Promise((resolve, reject) => {
              axios.get("/allmatches").then(response => {
                this.allMatches = response.data
                resolve()
            })
          })
      },
  }
};
</script>
