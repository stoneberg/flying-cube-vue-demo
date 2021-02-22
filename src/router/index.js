import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/main/Main.vue';
import Login from '@/views/auth/Login.vue';
import Callback from '@/views/auth/Callback.vue';
import Application from '@/views/application/Application.vue';
import tokenSerivce from '@/services/token/token.service';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    alias: '/main',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'Simple',
      requiresAuth: false
    }
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback,
    meta: {
      layout: 'Simple',
      requiresAuth: false
    }
  },
  {
    path: '/application',
    redirect: '/application/deployment',
    name: 'application',
    component: Application,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'deployment',
        name: 'deployment',
        component: () =>
          import(
            /* webpackChunkName: "deployment" */ '@/views/application/Deployment.vue'
          )
      },
      {
        path: 'pod',
        name: 'pod',
        component: () =>
          import(/* webpackChunkName: "pod" */ '@/views/application/Pod.vue')
      },
      { path: '*', redirect: '/' } // otherwise redirect to home
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => !record.meta.requiresAuth);
  const isPrivate = to.matched.some(record => !!record.meta.requiresAuth);

  // 로그인 필요한 페이지 접근 시
  if (isPrivate) {
    // jwt 토큰 존재 여부로 로그인 여부 판단
    if (!tokenSerivce.isValidToken()) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    } else {
      next(); // 로그인 되어 있다면 다음 이동
      // 로그인 시 사용자 정보에서 권한 확인
      //   let user = JSON.parse(localStorage.getItem('user'));
      //   if (to.matched.some(record => record.meta.is_admin)) {
      //     if (user.is_admin == 1) {
      //       next();
      //     } else {
      //       next({ name: 'main' });
      //     }
      //   } else {
      //     next();
      //   }
    }
  }
  // 로그인 필요 없는 페이지 접근 시
  else if (isPublic && tokenSerivce.isValidToken()) {
    // 이미 로그인된 상태라면
    next('/'); // 메인으로 리다이렉트
  } else {
    next();
  }
});

export default router;
