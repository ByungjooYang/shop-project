import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductList from "@/views/ProductList";
import productDetail from "@/views/ProductDetail";
import salesList from "@/views/SalesList";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/productList",
    name: "productList",
    component: ProductList
  },
  {
    path: "/detail",
    name: "detail",
    component: productDetail
  },
  {
    path: "/sales",
    name: "sales",
    component: salesList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
