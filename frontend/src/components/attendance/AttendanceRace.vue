<template>
<div>
    <h2>Yleisökeskiarvotilanne</h2>
    <v-card>
        <table>
            <tr v-for="(data, index) in avgs" v-bind:key="index">
                <td>{{index+1}}.</td>
                <td>{{data.hometeam}}</td>
                <td>{{Math.round(data.avg_attendance)}}</td>
            </tr>
        </table>
    </v-card>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AttendanceRace",
  data() {
      return {
          avgs: []
      }
  },
  mounted() {
      this.getAttendances()
  },
  methods: {
    getAttendances() {
      axios.get("/attendanceAverages", {
          params: {
              year: new Date().getFullYear()
          }
      }).then(response => {
        this.avgs = response.data
      })
    }
  }
};
</script>
