<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <router-link class="link" to="/"> <h3>Notes</h3></router-link>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.link {
  text-decoration: none !important;
  color: white !important;
}
</style>
