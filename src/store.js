import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)

Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    mytask: null
  },
  mutations: {
      loadTask(state, task){
         state.mytask = task
      },
  },
  actions: {
      obtainTask({commit}) {
         axios.get('http://localhost:3000/api/tasks')
              .then(res => {
                 commit('loadTask', res.data);
              })
              .catch(err => console.error(err));
      },
  }
})
