import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  { path: '/', component: () => import('./components/Dashboard.vue') },
  {
    path: '/Customers',
    component: () => import('./components/Customers/index.vue')
  },
  {
    path: '/Customers/:action',
    component: () => import('./components/Customers/form.vue')
  },
  {
    path: '/Customers/:action/:id',
    component: () => import('./components/Customers/form.vue')
  },
  { path: '/Orders', component: () => import('./components/Orders/index.vue') },
  {
    path: '/Orders/:action',
    component: () => import('./components/Orders/form.vue')
  },
  {
    path: '/Orders/:action/:id',
    component: () => import('./components/Orders/form.vue')
  },
  {
    path: '/Products',
    component: () => import('./components/Products/index.vue')
  },
  {
    path: '/Products/:action',
    component: () => import('./components/Products/form.vue')
  },
  {
    path: '/Products/:action/:id',
    component: () => import('./components/Products/form.vue')
  },
]


const router = new VueRouter({
  routes // short for `routes: routes`
})

export default router