export const SET_DEPLOYMENTS = (state, deployments) => {
  state.deployments = [].concat(deployments);
};

export const SET_DEPLOYMENT_PAGINATION = (
  state,
  { totalElements, number, size }
) => {
  state.deploymentPagination.totalElements = totalElements;
  state.deploymentPagination.number = number;
  state.deploymentPagination.size = size;
};

export const SET_DEPLOYMENT = (state, deployment) => {
  state.deployments.push(deployment);
};

export const UPDATE_DEPLOYMENT = (state, deployment) => {
  const index = state.deployments.findIndex(dpl => dpl.id === deployment.id);
  state.deployments.splice(index, 1, deployment);
};

export const DELETE_DEPLOYMENT = (state, id) => {
  const index = state.deployments.findIndex(deployment => deployment.id === id);
  state.deployments.splice(index, 1);
};
