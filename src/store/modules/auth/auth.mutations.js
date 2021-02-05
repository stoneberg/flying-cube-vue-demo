export const SET_USER = (state, user) => {
  console.log('SET_USER===================>', state);
  console.log('SET_USER===================>', user);
  state.user = user;
};
export const DELETE_USER = state => {
  console.log('DELETE_USER===================>');
  state.user = {};
};
