import ApplicationApi from '@/services/application';

export const getDeployments = async ({ commit }, params) => {
  console.log('params>>>>>>', params);
  const response = await ApplicationApi.deployment.getAll(params);
  console.log('response>>>>>>', response);
  console.log('response.content>>>>>>', response.data.data.content);
  console.log('response.pageable>>>>>>', response.data.data.pageable);
  if (response.status === 200) {
    commit('SET_DEPLOYMENTS', response.data.data.content);
    commit('SET_DEPLOYMENT_PAGINATION', response.data.data);
  }
};
