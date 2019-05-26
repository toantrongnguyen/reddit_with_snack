import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const TestPage = () => import('../pages/TestPage')
const Hompage = () => import('../pages/Hompage')
const LoginPage = () => import('../pages/LoginPage')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Hompage,
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ],
})

export default router
