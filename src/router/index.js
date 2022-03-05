import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../home/Home.vue'
import Mint from "../mint/Mint";
import CustomQRCodeHandler from "./CustomQRCodeHandler";
import { vueErdJsStore, VueErdjsConnect } from '../../src'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/authenticate',
    name: 'VueErdjsConnect',
    component: VueErdjsConnect,
    props: { qrcodeHandler: new CustomQRCodeHandler(), token: "hello" }
  },
  {
    path: '/:pathMatch(.*)*',
    beforeEnter (to) {
      window.location = `/`
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/bonaparks/',
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    next();
  } else if (!vueErdJsStore.logged) {
    next({
      path: '/authenticate',
      query: { fromUrl: to.fullPath }
    })
  } else {
    next();
  }
})

export default router
