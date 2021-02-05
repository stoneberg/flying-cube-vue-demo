import state from './auth.state';
import * as getters from './auth.getters';
import * as mutations from './auth.mutations';
import * as actions from './auth.actions';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
