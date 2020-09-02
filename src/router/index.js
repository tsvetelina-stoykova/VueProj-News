import Vue from 'vue'
import Router from 'vue-router'
import BGNews from '@/components/BGNews'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BGNews',
      component: BGNews
    }
  ]
})
