import isValidJwt from '@/shared/utils/jwt';

// export const isAuthenticated = state => {
//   return isValidJwt(state.jwt.token);
// };

export const getUser = state => {
  return state.user;
};
