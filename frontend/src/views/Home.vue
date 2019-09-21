<template>
<v-container>
  <v-row>
    <v-col>
      <MatchesToday />
    </v-col>
    <v-col>
      <AttendanceRace />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import MatchesToday from '@/components/history/MatchesToday';
import AttendanceRace from '@/components/attendance/AttendanceRace.vue'

export default {
  components: {
    MatchesToday,
    AttendanceRace  
  },
};
</script>
