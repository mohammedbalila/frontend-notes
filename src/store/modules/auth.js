/* eslint-disable */

import axios from 'axios';

const state = {
  currentUser: getSavedState('auth.currentUser'),
  errors: [],
};

const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  },
};

const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState('auth.currentUser', newValue);
    setDefaultAuthHeaders(state);
  },
  SET_ERRORS(state, errors) {
    state.errors = errors;
  },
};

const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state }) {
    setDefaultAuthHeaders(state);
  },

  async signUp({ commit }, user) {
    try {
      const resp = await axios.post('/users/signup/', user);
      commit('SET_CURRENT_USER', resp.data);
    } catch (error) {
      const errors = formatError(error.response);
      commit('SET_ERRORS', errors);
      throw new Error(error);
    }
  },

  async logIn({ commit }, user) {
    try {
      const resp = await axios.post('/users/login/', user);
      commit('SET_CURRENT_USER', resp.data);
    } catch (error) {
      const errors = formatError(error.response);
      commit('SET_ERRORS', errors);
      throw new Error(error);
    }
  },

  async logOut({ commit }) {
    commit('SET_CURRENT_USER', null);
    window.location.reload();
  },
};

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

function formatError(error) {
  const { data } = error;
  const errors = Object.values(data).map(err => err);
  return errors;
}

function setDefaultAuthHeaders(state) {
  const isDev = process.env.NODE_ENV === 'development';
  const url = isDev
    ? 'http://localhost:8000/api'
    : 'https://diarme-api.herokuapp.com/api';
  axios.defaults.baseURL = url;
  axios.defaults.headers.common.Authorization = state.currentUser
    ? `Bearer ${state.currentUser.token}`
    : '';
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
