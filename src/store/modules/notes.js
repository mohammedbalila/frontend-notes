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
  async getNotes({ commit, state }) {
    try {
      const resp = await axios.get('/notes/');
      commit('SET_NOTES', resp.data.notes);
    } catch (error) {
      throw new Error(error);
    }
  },

  async getNote({ commit, state }, id) {
    try {
      const resp = await axios.get(`/notes/${id}/`);

      commit('SET_NOTE', resp.data.note);
      return resp.data.note;
    } catch (error) {
      throw new Error(error);
    }
  },

  async create({ dispatch }, note) {
    try {
      const resp = await axios.post('/notes', note);
      dispatch('getNotes');
      return resp.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async update({ dispatch }, note) {
    try {
      const resp = await axios.put(`/notes/${note.id}`, note);
      dispatch('getNote', note.id);
      return resp.data;
    } catch (error) {
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
