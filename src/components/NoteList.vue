<template>
  <v-container fluid>
    <v-card>
      <v-list three-line subheader>
        <v-subheader>Previous notes</v-subheader>
        <template v-for="note of notes">
          <v-list-item :to="{ name: 'Note', params: { id: note.id } }" :key="note.title">
            <v-subheader v-text="note.createdAt.toDateString()"></v-subheader>
            <v-list-item-content>
              <v-list-item-title v-text="note.title"></v-list-item-title>
              <v-list-item-subtitle v-text="note.body"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="note.id"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'NoteList',
  props: {
    notes: { type: Array, required: true },
  },
};
</script>
