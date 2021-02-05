const getters = {
  // reusable data accessors
  isAuthenticated(state) {
    return isValidJwt(state.jwt.token);
  }
};
