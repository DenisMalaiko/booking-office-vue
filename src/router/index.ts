import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "@/views/auth/auth.vue";
import AuthSignIn from "@/views/auth/components/auth-sign-in/auth-sign-in.vue";
import AuthSignUp from "@/views/auth/components/auth-sign-up/auth-sign-up.vue";

const routes = [
  {
    path: '/auth/',
    name: 'auth',
    component: AuthPage,
    children: [
      {
        path: 'sign-in',
        component: AuthSignIn
      },
      {
        path: 'sign-up',
        component: AuthSignUp
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // },
  {
    path: '/',
    redirect: '/auth/sign-in'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
