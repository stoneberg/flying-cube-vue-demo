import state from './application.state';
import * as getters from './application.getters';
import * as mutations from './application.mutations';
import * as actions from './application.actions';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
