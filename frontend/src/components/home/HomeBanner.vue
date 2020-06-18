<template>
    <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="text-center" outlined>
          <v-container>
            <v-row>
              <v-col>
                <h1>Explore Veikkausliiga data</h1>
              </v-col>
            </v-row>
            <v-row class="text-center">
              <v-col>
                <div><v-icon large>mdi-soccer</v-icon></div>
                <div>Matches</div>
              </v-col>
              <v-col>
                <div><v-icon large>mdi-stadium</v-icon></div>
                <div><a @click="$router.push({name: 'attendance'})">Attendances</a></div>
              </v-col>
              <v-col>
                <div><v-icon large>mdi-format-list-numbered</v-icon></div>
                <div>Standings</div>
              </v-col>
              <v-col>
                <div><v-icon large>mdi-chart-areaspline</v-icon></div>
                <div>...and much more!</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
    name: "HomeBanner"
}
</script>