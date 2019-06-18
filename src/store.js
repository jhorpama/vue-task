import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)

Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    mytask: null,
    subtasks: [],
  },
  mutations: {
      loadTask(state, task){
         state.mytask = task
      },
      loadSubtask(state, subtasks){
         state.subtasks = subtasks
      }
  },
  actions: {
      obtainTask({commit}, email) {
         const userEmail = email.email
         console.log('este es :'+ userEmail);
         axios.get(`https://api-week-tasks.herokuapp.com/api/tasks/${userEmail}`)
              .then(res => {
                 commit('loadTask', res.data);
              })
              .catch(err => console.error(err));
      },
      getSubtasks({commit}) {
          axios.get('https://api-week-tasks.herokuapp.com/api/subtasks/')
               .then(res => {
                  commit('loadSubtask', res.data);
               }).catch(err => {
                  console.error(err);
               })
      }
  }
})
