import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/Layout'
import nestedRouter from './nested'
import componentsRouter from './components'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    console.log(err)
  })
}
export const constantRoutes = [
  nestedRouter,
  componentsRouter,
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '设置',
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: 'Dashboard', icon: 'el-icon-s-tools' }
      },
      {
        path: 'Adashboard',
        name: 'Adashboard',
        meta: { title: 'Adashboard', icon: 'el-icon-s-tools' },
        children: [
          {
            path: 'Bdashboard',
            name: 'Bdashboard',
            component: () => import('@/views/Bdashboard'),
            meta: { title: 'Bdashboard', icon: 'el-icon-s-tools' }
          },
          {
            path: 'Cdashboard',
            name: 'Cdashboard',
            component: () => import('@/views/Cdashboard'),
            meta: { title: 'Cdashboard', icon: 'el-icon-s-tools' }
          }
        ]
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/index',
    children: [
      {
        path: 'index',
        name: 'exampleindex',
        component: () => import('@/views/example'),
        meta: { title: 'Example', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    path: '/zzz',
    component: Layout,
    redirect: '/zzz/index',
    children: [
      {
        path: 'index',
        name: 'zzzindex',
        component: () => import('@/views/zzz'),
        meta: {
          title: 'zzz',
          icon: 'el-icon-s-tools'
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: 'link',
    components: Layout,
    children: [
      {
        path: 'https://www.baidu.com',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export default router
