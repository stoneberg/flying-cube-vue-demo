export const getDeployment = state => id => {
  return state.deployments.find(deployment => deployment.id === id);
};
