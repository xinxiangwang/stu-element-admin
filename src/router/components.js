import Layout from '@/Layout'

const req = require.context('../views/components', true, /index.vue$/)

const routes = req.keys().map(item => {
  item = item.replace('./', '/')
  const name = item.split('/')[1]
  return {
    path: name,
    name,
    component: () => import('@/views/components' + item),
    meta: {
      title: name
    }
  }
})

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: '/components/xl-col',
  name: 'Components',
  meta: {
    title: 'components',
    icon: 'el-icon-s-cooperation'
  },
  children: routes
  // children: [
  //   {
  //     path: 'xl-col',
  //     component: () => import('@/views/components/xl-col'),
  //     name: 'XlColTest',
  //     meta: { title: 'XlColTest' }
  //   },
  //   {
  //     path: 'xl-input',
  //     component: () => import('@/views/components/xl-input'),
  //     name: 'XlInput',
  //     meta: { title: 'XlInput' }
  //   },
  //   {
  //     path: 'xl-form',
  //     component: () => import('@/views/components/xl-form'),
  //     name: 'XlForm',
  //     meta: { title: 'XlForm' }
  //   },
  //   {
  //     path: 'xl-dropdown',
  //     component: () => import('@/views/components/xl-dropdown'),
  //     name: 'XlDropdown',
  //     meta: { title: 'XlDropdown' }
  //   }
  // ]
}

export default componentsRouter
