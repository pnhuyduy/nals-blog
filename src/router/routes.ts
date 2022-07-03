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
        meta: {
          title: 'Trang chủ',
        },
      },
      {
        path: '/blog/:id',
        name: 'main.blog',
        component: () => import('@/views/Blog/Blog.vue'),
        meta: {
          title: 'Blog',
        },
      },
      {
        path: '/manager',
        name: 'manager.blog',
        component: () => import('@/views/Manager/Blog.vue'),
        meta: {
          title: 'Quản lý',
        },
      },
      {
        path: '/manager/new',
        name: 'manager.blog.create',
        component: () => import('@/views/Manager/CreateBlog.vue'),
        meta: {
          title: 'Tạo mới blog',
        },
      },
      {
        path: '/manager/edit/:id',
        name: 'manager.blog.edit',
        component: () => import('@/views/Manager/EditBlog.vue'),
        meta: {
          title: 'Sửa blog',
        },
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Không tìm thấy',
    },
  },
]

export default routes
