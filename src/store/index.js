import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

import application from './modules/application';
import auth from './modules/auth';

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  modules: {
    application,
    auth
  },
  plugins: [
    createPersistedState({
      paths: ['auth']
    })
  ]
});
