import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    const authorization = to.matched.some(record => record.meta.requiresAuth )
    console.log(authorization);
    const token = localStorage.getItem('key')
    console.log(token);
    if(authorization === true && token === null){
      next('login')
    }else if(authorization !== false && token !== null){
      next();
    }else{
      next()
    }
});

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
