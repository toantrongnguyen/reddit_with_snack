import Vue from 'vue'
import Router from 'vue-router'
import store from '@/stores'

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
      meta: { globalAccess: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(route => !route.meta.globalAccess)
  const { isLogin } = store.state.Global
  if (!requireAuth || isLogin) {
    return next()
  }

  return next("/login")
})

export default router
