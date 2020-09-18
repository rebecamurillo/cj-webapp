import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Category from '../views/product/Category.vue'
import Product from '../views/product/Product.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/category',
    name: 'Edit Category',
    component: Category
  },
  {
    path: '/product',
    name: 'Edit Product',
    component: Product
  }
]

const router = new VueRouter({
  routes
})

export default router
