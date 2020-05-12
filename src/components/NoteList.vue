<template>
  <v-container fluid>
    <v-card>
      <v-list three-line subheader>
        <v-subheader>Previous notes</v-subheader>
        <template v-for="note of notes">
          <v-list-item :key="note.title">
            <!-- <v-subheader v-text="note.createdAt"></v-subheader> -->
            <v-list-item-content>
              <v-list-item-title
                class="title"
                @click="$router.push({ name: 'Note', params: { id: note._id } })"
                v-text="note.title"
              ></v-list-item-title>
              <v-list-item-subtitle v-text="note.date"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-btn fab icon color="red" @click="deletedId = note._id;deleteDialog = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-avatar>
          </v-list-item>
          <v-divider :key="note.id"></v-divider>
        </template>
      </v-list>
    </v-card>
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="onDelete">Yes</v-btn>
          <v-btn color="red darken-1" text @click="deleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NoteList',
  data() {
    return {
      deleteDialog: false,
      deletedId: null,
    };
  },

  props: {
    notes: { type: Array, required: true },
  },

  methods: {
    ...mapActions('notes', ['deleteNote']),
    onDelete() {
      this.deleteNote(this.deletedId).then(() => {
        this.deleteDialog = false;
      });
    },
  },
};
</script>
<style scoped>
.title {
  cursor: pointer;
  color: #3949ab;
  text-transform: capitalize;
  font-family: 'Playfair Display', serif;
}
</style>
