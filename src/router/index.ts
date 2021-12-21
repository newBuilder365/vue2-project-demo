import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/Layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue')
      },
      {
        path: '/create-edit-menu',
        name: 'create-edit-menu',
        meta: {
          requiredAuth: true
        },
        component: () => import(/* webpackChunkName: 'create-edit-menu' */'@/views/menu/components/createOrEditMenu.vue')
      },
      {
        path: '/role/:roleId/allocMenu',
        name: 'allocMenu',
        meta: {
          requiredAuth: true
        },
        props: true,
        component: () => import(/* webpackChunkName: 'allocMenu' */'@/views/role/components/allocMenu.vue')
      },
      {
        path: '/role/:roleId/allocResource',
        name: 'allocResource',
        meta: {
          requiredAuth: true
        },
        props: true,
        component: () => import(/* webpackChunkName: 'allocResource' */'@/views/role/components/allocResource.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: 'error' */'@/views/error/index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
