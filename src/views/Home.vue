<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar>
        <v-btn :to="{ name: 'Note', params: { id: '0' } }" class="mx-2" icon dark color="pink">
          <v-icon dar>mdi-plus</v-icon>
        </v-btn>

        <v-btn icon color="green" @click="getNotes">
          <v-icon>mdi-cached</v-icon>
        </v-btn>

        <v-btn icon color="yellow" @click="getStarredNotes">
          <v-icon>mdi-star</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <!--
          <v-text-field hide-details prepend-icon="mdi-magnify" @input="search"></v-text-field>
        -->
      </v-toolbar>
    </v-col>
    <v-col cols="12">
      <NoteList :notes="notes" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NoteList from '@/components/NoteList.vue';

export default {
  name: 'Home',
  data() {
    return { searchText: '' };
  },
  computed: {
    ...mapState('notes', {
      notes: state => state.notes,
    }),
  },
  components: {
    NoteList,
  },

  created() {
    this.getNotes();
  },

  methods: {
    ...mapActions('notes', ['getNotes', 'getStarredNotes', 'search']),
  },
};
</script>
