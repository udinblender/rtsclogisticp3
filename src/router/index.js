console.log('router/index.js')
import { createRouter, createWebHashHistory, Route } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import DefaultLayoutStandAlone from '@/standalone/layouts/DefaultLayoutStandAlone'
/*define const other in here*/

console.log(process.env.VUE_APP_STANDALONE_SINGLE_SPA)
const routes = [
  {
    path: '/',
    name: 'Home',
    component:
      process.env.VUE_APP_STANDALONE_SINGLE_SPA === 'true'
        ? DefaultLayoutStandAlone
        : DefaultLayout,
    redirect:  ( process.env.VUE_APP_STANDALONE_SINGLE_SPA!=='true' && (!localStorage.id_token || localStorage.id_token == '' )) ? 
      () => {
        window.location.href = process.env.dc+'/#/sc/login' 
        // return '/redirectingToLogin' // not important since redirecting
      }: '/app/dashboard',
    children: [
      {
        path: '/app/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Dashboard.vue'),
      },

/*define other in here*/
    ],
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/pages/Page404'),
  },
  {
    path: '/500',
    name: 'Page500',
    component: () => import('@/views/pages/Page500'),
  },
  {
    path: '/app/andon/sps',
    name: 'master',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/SPS.vue'),
    meta: { layout: 'displayRTSC' } // Menetapkan layout login khusus
  },
  {
    path: '/app/andon/pline',
    name: 'pline',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/PLine.vue'),
    meta: { layout: 'displayRTSC' } // Menetapkan layout login khusus
  },
  {
    path: '/app/andon/importpart',
    name: 'importpart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/ImportPart.vue'),
    meta: { layout: 'displayRTSC' } // Menetapkan layout login khusus
  },
  {
    path: '/app/andon/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Dashboard.vue'),
    meta: { layout: 'displayRTSC' } // Menetapkan layout login khusus
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
