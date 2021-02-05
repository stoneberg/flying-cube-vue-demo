import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/main/Main.vue';
import Login from '@/views/auth/Login.vue';
import Application from '@/views/application/Application.vue';

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
      guest: true
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
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'pod',
        name: 'pod',
        component: () =>
          import(/* webpackChunkName: "pod" */ '@/views/application/Pod.vue'),
        meta: {
          requiresAuth: true
        }
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
  // 로그인 필요한 페이지 접근 시
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // jwt 토큰 존재 여부로 로그인 여부 판단
    if (!localStorage.getItem('accessToken')) {
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
  else if (to.matched.some(record => record.meta.guest)) {
    //     if (localStorage.getItem('jwt') == null) {
    //       next();
    //     } else {
    //       next({ name: 'userboard' });
    //     }
    //   } else {
    //     next();
    //   }
    next();
  }
});

export default router;
