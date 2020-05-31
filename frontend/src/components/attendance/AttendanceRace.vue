<template>
<div>
    <h2>Yleisökeskiarvo</h2>
    <v-select
      v-model="selectedYear"
      :items="years"
    >
    </v-select>
    <v-card outlined v-if="avgs.length > 0">
        <table>
            <tr v-for="(data, index) in avgs" v-bind:key="index">
                <td>{{index+1}}.</td>
                <td>{{data.hometeam}}</td>
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
          avgs: [],
      }
  },
  computed: {
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
          this.getAttendances()
      }
  },
  mounted() {
      this.getAttendances()
  },
  methods: {
    getAttendances() {
      axios.get("/attendanceAverages", {
          params: {
              year: this.selectedYear
              //year: new Date().getFullYear()
          }
      }).then(response => {
        this.avgs = response.data
      })
    }
  }
};
</script>
