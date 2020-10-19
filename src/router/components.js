import Layout from '@/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: '/components/xl-col',
  name: 'Components',
  meta: {
    title: 'components',
    icon: 'el-icon-s-cooperation'
  },
  children: [
    {
      path: 'xl-col',
      component: () => import('@/views/components/xl-col'),
      name: 'XlColTest',
      meta: { title: 'XlColTest' }
    },
    {
      path: 'xl-input',
      component: () => import('@/views/components/xl-input'),
      name: 'XlInput',
      meta: { title: 'XlInput' }
    }
  ]
}

export default componentsRouter
