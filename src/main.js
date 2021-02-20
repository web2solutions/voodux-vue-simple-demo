import Vue from 'vue'
import VueRouter from 'vue-router'




import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import voodux
import voodux from 'voodux'

// import data schemas
import UserSchema from './data/schemas/User'
import ProductSchema from './data/schemas/Product'
import OrderSchema from './data/schemas/Order'
import CustomerSchema from './data/schemas/Customer'

// foundation event handlers
import onApplicationStart from './data/events/onApplicationStart'
import onWorkerResponseClientId from './data/events/onWorkerResponseClientId'
  
// import Vue App
import App from './App.vue'
  
// import components


;(async () => {

  // create voodux foundation
  const foundation = new voodux.Foundation({
    name: 'My Vue App',
    schemas: {
      User: UserSchema,
      Product: ProductSchema,
      Order: OrderSchema,
      Customer: CustomerSchema
    }
  })

  

  // listen to foundation start event and attach a handler
  const appStartListener = foundation.on(
    'foundation:start',
    onApplicationStart.bind(foundation) // binds foundation as scope to main application event listeners
  )
  // listen to worker responseClientId event and attach a handler
  const workerSendClientIdListener = foundation.on(
    'worker:responseClientId',
    onWorkerResponseClientId.bind(foundation) // binds foundation as scope to main application event listeners
  )

  // destroy main voodux event listeners before window unload
  window.addEventListener('unload', () => {
    foundation.stopListenTo(appStartListener)
    foundation.stopListenTo(workerSendClientIdListener)
  })

  // starts voodux foundation
  const start = await foundation.start()
  if (start.error) {
    throw new Error(`Error starting foundation stack: ${start.error}`)
  }

  

  Vue.use(VueRouter)

  // let's use BoostrapVue 
  Vue.use(BootstrapVue)
  
  // adds voodux foundation to vue prototype then we can easily use it inside components
  Vue.prototype.$foundation = foundation

  const routes = [
    { path: '/', component: () => import('./components/Dashboard.vue') },
    { path: '/Customers', component: () => import('./components/Customers/index.vue') },
    { path: '/Orders', component: () => import('./components/Orders/index.vue') },
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })
  
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })

  // createApp(App).mount('#app')

})()
