import type { RouteConfig } from 'vue-router'
import NotFound from '@/views/NotFound.vue'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('@/layouts/LayoutMain.vue'),
    children: [
      {
        path: '/',
        name: 'main.home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/blog/:id',
        name: 'main.blog',
        component: () => import('@/views/Blog/Blog.vue'),
      },
    ],
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

export default routes
