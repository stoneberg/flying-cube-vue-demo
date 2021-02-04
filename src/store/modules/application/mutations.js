export const SET_DEPLOYMENTS = (state, deployments) => {
  state.deployments = [].concat(deployments);
};

export const SET_DEPLOYMENT_PAGINATION = (
  state,
  { totalElements, number, size }
) => {
  console.log('@@@totalElements====>', totalElements);
  console.log('@@@number====>', number);
  console.log('@@@size====>', size);
  state.deploymentPagination.totalElements = totalElements;
  state.deploymentPagination.number = number;
  state.deploymentPagination.size = size;
};

export const SAVE_DEPLOYMENT = (state, deployment) => {
  console.log('SAVE_DEPLOYMENT====>', deployment);
  state.deployments.push(deployment);
};

export const UPDATE_DEPLOYMENT = (state, deployment) => {
  console.log('UPDATE_DEPLOYMENT====>', deployment);
  const index = state.deployments.findIndex(dpl => dpl.id === deployment.id);
  console.log('index=========>', index);
  state.deployments.splice(index, 1, deployment);
  console.log('@@@@state.deployments=========>', state.deployments);
};

export const DELETE_DEPLOYMENT = (state, id) => {
  console.log('DELETE_DEPLOYMENT====>', id);
  const index = state.deployments.findIndex(deployment => deployment.id === id);
  console.log('>>>>>index', index);
  state.deployments.splice(index, 1);
};
