export const SET_DEPLOYMENTS = (state, deployments) => {
  state.deployments = [].concat(deployments);
};

export const SET_DEPLOYMENT_PAGINATION = (state, data) => {
  console.log('SET_DEPLOYMENT_PAGINATION====>', data);
  state.deploymentPagination.totalElements = data.totalElements;
  state.deploymentPagination.currentPage = data.number + 1;
  state.deploymentPagination.pageSize = data.size;
};

export const SAVE_DEPLOYMENT = (state, deployment) => {
  console.log('SAVE_DEPLOYMENT====>', deployment);
  state.deployments.push(deployment);
};

export const UPDATE_DEPLOYMENT = (state, deployment) => {
  console.log('UPDATE_DEPLOYMENT====>', deployment);
  const index = state.deployments.findIndex(d => d.id === deployment.id);
  console.log('index=========>', index);
  state.deployments.splice(index, 1, deployment);
  console.log('@@@@state.deployments=========>', state.deployments);
};
