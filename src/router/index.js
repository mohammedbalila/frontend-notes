/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    meta: { requiresAuth: false },
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/views/Signup.vue'),
  },
  {
    path: '/notes/:id',
    name: 'Note',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "note" */ '@/views/Note.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth.currentUser') === null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    }
    next();
  } else {
    next();
  }
});

export default router;
