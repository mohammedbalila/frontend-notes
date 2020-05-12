<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="pink lighten-1" dark flat>
            <v-toolbar-title>Welcome to Diarme</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                type="email"
                :rules="emailRules"
                label="Email"
                prepend-icon="mdi-account-circle"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                type="password"
                label="Password"
                prepend-icon="mdi-lock"
                required
              ></v-text-field>
            </v-form>
            <div v-if="errors">
              <p v-for="error of errors" :key="error" class="text-center red--text">{{ error }}</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text to="/signup">Create an account</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="pink" @click="validate">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be at least 8 characters',
    ],
  }),

  computed: {
    ...mapState('auth', {
      errors: state => state.errors,
      currentUser: state => state.currentUser,
    }),
  },

  created() {
    if (this.currentUser) {
      this.$router.push('/');
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email.trim(),
          password: this.password.trim(),
        };
        this.$store
          .dispatch('auth/logIn', user)
          .then(() => this.successRedirect());
      }
    },
    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: 'Home' };
      this.$router.push(redirectTo);
    },
  },

  destroyed() {
    this.$destroy();
  },
};
</script>
