import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CategoryPage from '../views/CategoryPage.vue'
import BooksPage from '../views/BooksPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryPage
  },
  {
    path: '/books',
    name: 'booksPage',
    component: BooksPage
  },
  {
    path: '/category/:slug',
    name: 'category',
    component: ()=> import('../views/CategoryList.vue')
  },
  {
    path: '/book/:slug',
    name: 'book',
    component: ()=> import('../views/BookDetail.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;