import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/single/Home'
import Details from '../components/single/Details'
import Search from '../components/single/Search'
import PageOne from '../components/bangbaoh5/PageOne'
import PageTwo from '../components/bangbaoh5/PageTwo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
        isBack: true
      },
    },
    {
      path: '/Details',
      name: 'Details',
      component: Details
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
      meta: {
        keepAlive: true,
        isBack: true
      }
    },
    {
      path: '/PageOne',
      name: 'PageOne',
      component: PageOne
    },
    {
      path: '/PageTwo',
      name: 'PageTwo',
      component: PageTwo
    }

  ]
})
