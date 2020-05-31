<template>
  <div class="home">
      <h2>Ottelut tänään {{today.day}}.{{today.month}}.{{randomYear}}</h2>
      <div v-if="loaded">
      <div v-for="(match, index) in matchesOnRandomYear" v-bind:key="index">
          <HistoricalMatch :match="match"></HistoricalMatch>
      </div>
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
  data() {
    return {
      randomYear: 0,
      loaded: true
    }
  },
  computed: {
      today() {
          var date = new Date()
          return {day: date.getDate(), month: date.getMonth() + 1}
      },
      matchesOnRandomYear() {
        return this.matches.filter(x => x.date[0] == this.randomYear)
      },
  },
  data() {
      return {
          matches: []
      }
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
