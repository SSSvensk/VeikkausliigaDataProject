<template>
<div>
    <h2>Yleisökeskiarvo</h2>
    <v-radio-group v-model="byYear">
      <v-radio
        :key="0"
        :label="'Kaikkien aikojen keskiarvot'"
        :value="false"
      ></v-radio>
      <v-radio
        :key="1"
        :label="'Kauden mukaan'"
        :value="true"
      ></v-radio>
    </v-radio-group>
    <v-select
      v-model="selectedYear"
      :disabled="!byYear"
      :items="years"
    >
    </v-select>
    <v-card outlined v-if="visibleAvgs.length > 0">
        <table>
            <tr v-for="(data, index) in visibleAvgs" v-bind:key="index">
                <td>{{index+1}}.</td>
                <td> <router-link :to="{ name: 'team', params: { team: data.hometeam }}">{{ data.hometeam }}</router-link></td>
                <td>{{Math.round(data.avg_attendance)}}</td>
            </tr>
        </table>
    </v-card>
    <v-card v-else outlined class="pa-5 text-center">
        No data
    </v-card>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AttendanceRace",
  data() {
      return {
          selectedYear: 2019,
          byYear: true,
          avgsBySeason: [],
          alltimeAvgs: []
      }
  },
  computed: {
      visibleAvgs() {
          if (this.byYear) {
              return this.avgsBySeason
          } else {
              console.log(this.alltimeAvgs)
              return this.alltimeAvgs
          }
      },
      years() {
          var tmp = []
          for (var i = 1990; i < new Date().getFullYear() + 1; i++) {
              tmp.push(i)
          }
          return tmp.reverse()
      }
  },
  watch: {
      selectedYear() {
          this.getAttendancesBySeason()
      }
  },
  mounted() {
      this.getAllTimeAttendances()
      this.getAttendancesBySeason()
  },
  methods: {
    getAttendancesBySeason() {
      axios.get("/attendanceAverages", {
          params: {
              year: this.selectedYear
          }
      }).then(response => {
        this.avgsBySeason = response.data
      })
    },
    getAllTimeAttendances() {
      axios.get("/alltime-attendance-averages").then(response => {
        this.alltimeAvgs = response.data
      })
    }
  }
};
</script>
