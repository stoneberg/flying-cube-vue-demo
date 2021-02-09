export const SET_LOADING = (state, isLoading) => {
  console.log('SET_LOADER===================>', isLoading);
  console.log({ isLoading });
  if (isLoading) {
    state.refCount++;
    state.isLoading = true;
  } else if (state.refCount > 0) {
    state.refCount--;
    state.isLoading = state.refCount > 0;
  }
};
