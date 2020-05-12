<template>
  <v-container fluid>
    <v-card>
      <v-list three-line subheader>
        <v-subheader>Previous notes</v-subheader>
        <template v-for="note of notes">
          <v-list-item :key="note.title">
            <v-list-item-content>
              <v-list-item-title
                class="title"
                @click="$router.push({ name: 'Note', params: { id: note._id } })"
                v-text="note.title"
              ></v-list-item-title>
              <v-list-item-subtitle v-text="note.date"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-row>
                <v-col cols="3">
                  <v-btn
                    fab
                    icon
                    :color="note.isStarred? 'yellow' : 'grey'"
                    @click="note.isStarred = !note.isStarred;star(note.isStarred, note._id)"
                  >
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn fab icon color="red" @click="deletedId = note._id;deleteDialog = true">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-action>
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
          <v-btn color="red darken-1" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="primary darken-1" text @click="onDelete">Yes</v-btn>
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
    ...mapActions('notes', ['deleteNote', 'update', 'getNotes']),
    onDelete() {
      this.deleteNote(this.deletedId).then(() => {
        this.deleteDialog = false;
      });
    },
    star(isStarred, id) {
      this.update({ id, isStarred }).then(() => this.getNotes());
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
