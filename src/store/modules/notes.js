/* eslint-disable */
import axios from 'axios';

const state = {
  notes: [],
  note: {},
};

const mutations = {
  SET_NOTES(localState, notes) {
    // eslint-disable-next-line no-param-reassign
    localState.notes = notes;
  },
  SET_NOTE(localState, note) {
    // eslint-disable-next-line no-param-reassign
    localState.note = note;
  },
};

const actions = {
  async getNotes({ commit }) {
    try {
      NProgress.start();
      const resp = await axios.get('/notes/');
      commit('SET_NOTES', resp.data.notes);
      NProgress.done();
    } catch (error) {
      NProgress.done();
      throw new Error(error);
    }
  },

  async getStarredNotes({ commit }) {
    try {
      NProgress.start();
      const resp = await axios.get('/notes/?isStarred=true');
      commit('SET_NOTES', resp.data.notes);
      NProgress.done();
    } catch (error) {
      NProgress.done();
      throw new Error(error);
    }
  },

  async search({ commit }, searchText) {
    try {
      NProgress.start({ commit });
      const resp = await axios.get(`/notes/?title=${searchText}`);
      commit('SET_NOTES', resp.data.notes);
      NProgress.done();
    } catch (error) {
      NProgress.done();
      throw new Error(error);
    }
  },

  async getNote({ commit, state }, id) {
    try {
      NProgress.start();
      const resp = await axios.get(`/notes/${id}/`);

      commit('SET_NOTE', resp.data.note);
      NProgress.done();
      return resp.data.note;
    } catch (error) {
      NProgress.done();
      throw new Error(error);
    }
  },

  async create({ dispatch }, note) {
    try {
      NProgress.start();
      const resp = await axios.post('/notes', note);
      dispatch('getNotes');
      NProgress.done();
      return resp.data;
    } catch (error) {
      NProgress.done();
      throw new Error(error);
    }
  },

  async update({ dispatch }, note) {
    try {
      NProgress.start();
      const resp = await axios.put(`/notes/${note.id}`, note);
      dispatch('getNote', note.id);
      NProgress.done();
      return resp.data;
    } catch (error) {
      NProgress.done();
      throw new Error(error);
    }
  },

  async deleteNote({ dispatch }, id) {
    try {
      NProgress.start();
      const resp = await axios.delete(`/notes/${id}`);
      dispatch('getNotes');
      NProgress.done();
      return resp.data;
    } catch (error) {
      NProgress.done();
      throw new Error(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
