import ApplicationApi from '@/services/application';

/**
 * Action Of Deployment Component
 */
export const getDeployments = async ({ commit }, params) => {
  console.log('params>>>>>>', params);
  const response = await ApplicationApi.deployment.getAll(params);
  console.log('response>>>>>>', response);

  console.log('TotalElements====>', response.data.data.totalElements);
  console.log('Numbers====>', response.data.data.number);
  console.log('Size====>', response.data.data.size);
  let { totalElements, number, size } = response.data.data;

  console.log('response.content>>>>>>', response.data.data.content);
  console.log('response.pageable>>>>>>', response.data.data.pageable);
  if (response.status === 200) {
    commit('SET_DEPLOYMENTS', response.data.data.content);
    commit('SET_DEPLOYMENT_PAGINATION', { totalElements, number, size });
  }
};

export const createDeployment = async ({ commit, dispatch }, data) => {
  const response = await ApplicationApi.deployment.save(data);
  if (response.status === 200) {
    commit('SAVE_DEPLOYMENT', response.data.data);
    dispatch('getDeployments');
  }
};

export const updateDeployment = async ({ commit }, data) => {
  console.log('data>>>>>>', data);
  const response = await ApplicationApi.deployment.update(data.id, data);
  if (response.status === 200) {
    commit('UPDATE_DEPLOYMENT', response.data.data);
  }
};

export const deleteDeployment = async ({ commit, dispatch }, id) => {
  const response = await ApplicationApi.deployment.delete(id);
  if (response.status === 200) {
    commit('DELETE_DEPLOYMENT', id);
  }
};
