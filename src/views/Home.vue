<template>
  <v-row>
    <v-col cols="12">
      <v-btn :to="{ name: 'Note', params: { id: '0' } }" class="mx-2" fab dark color="pink">
        <v-icon dar>mdi-plus</v-icon>
      </v-btn>
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
    ...mapActions('notes', ['getNotes']),
  },
};
</script>
