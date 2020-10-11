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
      path: 'xl-row',
      component: () => import('@/views/components/xl-row'),
      name: 'XlRow',
      meta: { title: 'XlRow' }
    }
  ]
}

export default componentsRouter
