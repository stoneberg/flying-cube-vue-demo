export const loader = ({ commit }, isLoading) => {
  console.log('isLoading===================>', isLoading);
  commit('SET_LOADING', isLoading);
};
