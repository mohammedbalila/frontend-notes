/* eslint-disable */
import axios from 'axios';

const state = {
  notes: [
    {
      id: 1,
      title: 'DayOne',
      body: 'this is a note',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'DayTwo',
      body: 'this is a note',
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'DayThree',
      body: 'this is a note',
      createdAt: new Date(),
    },
  ],
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
      commit('SET_NOTES', state.notes);
    } catch (error) {
      throw new Error(error);
    }
  },

  async getNote({ commit, state }, id) {
    try {
      //   const resp = await axios.get(`/products/${productId}/notes/`);
      const note = state.notes.find(_note => {
        if (_note.id === id) {
          return _note;
        }
      });
      commit('SET_NOTE', note);
      //   return resp.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async create({ dispatch }, note) {
    // try {
    //   const resp = await axios.post(
    //     `/products/${review.product}/notes/`,
    //     review,
    //   );
    //   dispatch('getnotes', review.product);
    //   return resp.data;
    // } catch (error) {
    //   throw new Error(error);
    // }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
