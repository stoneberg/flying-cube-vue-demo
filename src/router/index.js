import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Application from '../views/Application.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/application',
    redirect: '/application/deployment',
    name: 'Application',
    component: Application,
    children: [
      {
        path: 'deployment',
        name: 'Deployment',
        component: () =>
          import(
            /* webpackChunkName: "deployment" */ '../views/application/Deployment.vue'
          )
      },
      {
        path: 'pod',
        name: 'Pod',
        component: () =>
          import(/* webpackChunkName: "pod" */ '../views/application/Pod.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
