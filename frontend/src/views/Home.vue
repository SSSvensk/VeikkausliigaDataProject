<template>
<div>
  <HomeBanner></HomeBanner>
<v-container>
  
  <v-row>
    <v-col>
      <NextMatches />
      <MatchesToday />
    </v-col>
    <v-col>
      <AttendanceRace />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-select
      v-model="selectedYear"
      :items="[2015, 2016]"
    >
    </v-select>
      <Standings></Standings>
    </v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
import HomeBanner from '@/components/home/HomeBanner.vue';
import MatchesToday from '@/components/history/MatchesToday';
import AttendanceRace from '@/components/attendance/AttendanceRace.vue'
import Standings from '@/components/standings/Standings.vue'
import NextMatches from '@/components/matches/NextMatches.vue'

export default {
  components: {
    MatchesToday,
    AttendanceRace,
    Standings,
    HomeBanner,
    NextMatches
  },
  data() {
    return {
      selectedYear: null
    }
  }
};
</script>
