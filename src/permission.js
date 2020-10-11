import router from './router'
// import store from './store'
import { getToken } from './utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

const whiteList = ['/login']

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  NProgress.start()
  console.log(hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
