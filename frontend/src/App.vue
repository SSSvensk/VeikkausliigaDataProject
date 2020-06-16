<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{ name: 'home'}"><span>Veikkausliiga</span></router-link>
        <span class="font-weight-light"> DATA PROJECT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        hide-details
        prepend-icon="place"
        single-line
      ></v-text-field>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
