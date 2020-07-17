import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/single/Home'
import Details from '../components/single/Details'
import Search from '../components/single/Search'
import EditResume from '../components/single/EditResume'
import Teacher from '../components/single/Teacher'
import BasicInformation from '../components/single/BasicInformation'
import Specialty from '../components/single/Specialty'
import Jobintension from '../components/single/Jobintension'
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
      path:'/EditResume',
      name:'EditResume',
      component:EditResume,
    },
    {
      path:'/Teacher',
      name:'Teacher',
      component:Teacher,
    },
    {
      path:'/BasicInformation',
      name:'BasicInformation',
      component:BasicInformation,
    },
    {
      path:'/Specialty',
      name:'Specialty',
      component:Specialty,
    },
    {
      path:'/Jobintension',
      name:'Jobintension',
      component:Jobintension,
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
