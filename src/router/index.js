import Vue from 'vue'
import Router from 'vue-router'
import mainpo from './mainpo'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

const router = new Router({
  routes: [
    ...mainpo,
    {
      path: '/mainpo',
      name: 'mainpo',
      component: () => import('@/views/item/mainpo.vue')
    }
    // {
    //   path: '/eric',
    //   name: 'eric',
    //   component: () => import('@/views/item/mainpo.vue')
    // }
  ]
})

export default router
