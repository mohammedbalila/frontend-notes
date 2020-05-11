<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Name this day"
          v-model="title"
          :append-icon="!editTitle ? 'mdi-pencil' : 'mdi-check'"
          filled
          shaped
          :readonly="!editTitle"
          @click:append="editTitle = !editTitle"
          background-color="#a2bdf2"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          name="input-7-1"
          label="Tell me about what you think 👀"
          v-model="body"
          :append-icon="!editBody ? 'mdi-pencil' : 'mdi-check'"
          filled
          shaped
          :readonly="!editBody"
          @click:append="editBody = !editBody"
          background-color="#a2bdf2"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn class="mx-2" rounded dark color="indigo" @click="save">
          Save
          <v-icon dark>mdi-content-save</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Note',
  props: { id: String },
  data() {
    return {
      editTitle: false,
      editBody: false,
      title: '',
      body: '',
    };
  },
  computed: {
    ...mapState('notes', {
      note: state => state.note,
    }),
  },
  created() {
    this.getNote(this.id).then(() => {
      this.title = this.note.title;
      this.body = this.note.body;
    });
  },

  methods: {
    ...mapActions('notes', ['getNote', 'updateNote']),
    save() {
      const { body, title } = this;
      this.updateNote({ body, title });
    },
  },
};
</script>
