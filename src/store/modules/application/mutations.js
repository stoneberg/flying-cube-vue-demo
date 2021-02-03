export const SET_DEPLOYMENTS = (state, deployments) => {
  state.deployments = deployments;
};

export const SET_DEPLOYMENT_PAGINATION = (state, data) => {
  console.log('data====>', data);
  state.deploymentPagination.totalElements = data.totalElements;
  state.deploymentPagination.currentPage = data.number + 1;
  state.deploymentPagination.pageSize = data.size;
};
