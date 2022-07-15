import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from "@/views/auth/Auth.vue";
import AuthSignIn from "@/views/auth/components/auth-sign-in/Auth-Sign-In.vue";
import AuthSignUp from "@/views/auth/components/auth-sign-up/Auth-Sign-Up.vue";
import BookingPage from "@/views/booking/Booking.vue"
import Guard from "@/shared/helpers/Guard";

const routes = [
  {
    path: '/auth/',
    name: 'auth',
    component: AuthPage,
    children: [
      {
        name: 'sign-in',
        path: 'sign-in',
        component: AuthSignIn
      },
      {
        name: 'sign-up',
        path: 'sign-up',
        component: AuthSignUp
      }
    ]
  },
  {
    path: '/booking',
    name: 'booking',
    component: BookingPage,
    beforeEnter: [Guard]
  },
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
