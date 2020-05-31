<template>
  <div class="home">
      <h2>Ottelut historiassa</h2>
      <h3> {{today.day}}.{{today.month}}.{{randomYear}}</h3>
      <v-container fluid v-if="loaded">
        <v-row>
          <v-col md="6" sm="12" v-for="(match, index) in matchesOnRandomYear" v-bind:key="index">
            <HistoricalMatch :match="match"></HistoricalMatch>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        Loading...
      </v-container>
  </div>
</template>

<script>
import axios from "axios"
import HistoricalMatch from "@/components/history/HistoricalMatch.vue"

export default {
  name: 'MatchesToday',
  components: {
      HistoricalMatch
  },
  data() {
    return {
      randomYear: 0,
      loaded: true,
      matches: []
    }
  },
  computed: {
      today() {
          var date = new Date()
          return {day: date.getDate(), month: date.getMonth() + 1}
      },
      matchesOnRandomYear() {
        return this.matches.filter(x => x.date.split("-")[0] == this.randomYear)
      },
  },
  mounted() {
    this.loaded = false
    this.showSomeData()
  },
  methods: {
    showSomeData() {
      axios.get("/matchestoday").then(response => {
        this.matches = response.data
        var years = new Set()
        for (var i = 0; i < response.data.length; i++) {
          var dateSpl = response.data[i].date.split("-")
          years.add(dateSpl[0])
        }
        
        let allYears = Array.from(years)
        var randomnumber = Math.floor(Math.random() * (allYears.length - 0 + 1))
        this.randomYear = allYears[randomnumber]
        this.loaded = true
      })
    }
  }
}
</script>
