<template>
  <div class="home">
      <h2>Ottelut tänään {{today.day}}.{{today.month}}.{{randomYear}}</h2>
      <div v-for="(match, index) in matches" v-bind:key="index">
          <HistoricalMatch :match="match"></HistoricalMatch>
      </div>
  </div>
</template>

<script>
import axios from "axios"
import HistoricalMatch from "@/components/history/HistoricalMatch.vue"

export default {
  name: 'home',
  components: {
      HistoricalMatch
  },
  computed: {
      today() {
          var date = new Date()
          return {day: date.getDate(), month: date.getMonth() + 1}
      },
      randomYear() {
        var years = new Set()
        for (var i = 0; i < this.matches.length; i++) {
          var dateSpl = this.matches[i].date.split("-")
          years.add(dateSpl[0])
        }
        
        let allYears = Array.from(years)
        var randomnumber = Math.floor(Math.random() * (allYears.length - 0 + 1))
        return allYears[randomnumber]
      }
  },
  data() {
      return {
          matches: []
      }
  },
  mounted() {
    this.showSomeData()
  },
  methods: {
    showSomeData() {
      axios.get("/matchestoday").then(response => {
        this.matches = response.data
      })
    }
  }
}
</script>
