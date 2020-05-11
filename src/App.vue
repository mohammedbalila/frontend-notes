<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <router-link class="link" to="/">
        <h3>Diarme</h3>
      </router-link>
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

  metaInfo: {
    // Children can override the title.
    title: 'Home',
    titleTemplate: 'Diarme',
    // Define meta tags here.
    meta: [
      { property: 'og:title', content: 'Diarme' },
      { property: 'og:site_name', content: 'Diarme' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://diarme.herokuapp.com/' },
      {
        property: 'og:image',
        content: 'http://diarme.herokuapp.com/img/logo.png',
      },
      // Often the same as your meta description, but not always.
      { property: 'og:description', content: 'Note taking the better way!.' },

      // Twitter card
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'twitter:site',
        content: 'http://diarme.herokuapp.com/',
      },
      { name: 'twitter:title', content: 'Diarme' },
      {
        name: 'twitter:description',
        content: 'Note taking the better way!.',
      },

      // Google / Schema.org markup:
      { itemprop: 'name', content: 'Diarme' },
      { itemprop: 'description', content: 'Note taking the better way!' },
      {
        itemprop: 'image',
        content: 'http://diarme.herokuapp.com/img/logo.png',
      },
    ],
  },
};
</script>

<style scoped>
.link {
  text-decoration: none !important;
  color: white !important;
}
</style>
