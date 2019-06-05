<template>
    <div>
        <b-container>
            <b-row>
                <b-col md="6">
                     <h2 class="text-center">ADD TASK</h2>
                     <b-card>
                         <b-form-input
                         type="text"
                         placeholder="Enter the name of the task"
                         v-model="name"
                         ></b-form-input>
                         <b-form-textarea
                         class="mt-4"
                         placeholder="Enter the description of the Task"
                         v-model="description"
                         rows="3"
                         max-rows="3"
                         ></b-form-textarea>
                         <b-button v-if="estado" @click="updateTask" class="btn-block mt-3" variant="outline-success">Update Task</b-button>
                         <b-button v-else class="btn-block mt-3" variant="outline-success" @click="addTask">Add Task</b-button>
                     </b-card>
                </b-col>
                <b-col md="6">
                     <h2 class="text-center">My TASK</h2>
                     <ul v-for="task in mytask" :key="task._id">
                         <b-card-group>
                                <b-card>
                                    <li>{{task._id}}</li>
                                    <li>{{task.name}}</li>
                                    <li>{{task.description}}</li>
                                    <li>{{task.create_at}}</li>
                                    <p>{{nombre}}</p>
                                    <b-card-body>
                                        <b-button class="m-3" @click="loadTask(task._id, task.name, task.description)" variant="outline-primary">Update</b-button>
                                        <b-button @click="deleteTask(task._id)" variant="outline-danger">Delete</b-button>
                                    </b-card-body>
                                </b-card>
                         </b-card-group>
                     </ul>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
     import { mapState, mapActions } from 'vuex'
     const axios = require('axios');
     export default{
         name: 'Task',
         components: {
         },
         data() {
             return {
                 name: null,
                 nombre: null,
                 description: null,
                 id: null,
                 estado: false,
                 mysubtask: null,
             }
         },
         computed: {
             ...mapState([
                 'mytask'
             ])
         },
         methods: {
             ...mapActions([
                 'obtainTask',
                 'addTask'
             ]),
             addTask() {
                axios.post('http://localhost:3000/api/task/add',{
                    name: this.name,
                    description: this.description
                })
                    .then(res => {
                            this.mytask.unshift(res.data);
                            this.name = null
                            this.description = null
                    })
                    .catch(err => {
                        console.error(err);
                    })
             },
             removeItem(id){
                     const index = this.mytask.map((task, index) => {

                               if ( task._id === id ) {
                                   return index
                               }

                           });

                    this.mytask.splice(index, 1);
             },
             deleteTask(id){
                 console.log(id);
                 axios.delete(`http://localhost:3000/api/task/delete/${id}`)
                      .then(res => {
                           this.removeItem(res.data._id);
                      })
                      .catch(err => {
                          console.error(err);
                      })
             },
             loadTask(id,name,description){
                  console.log(id,name,description);
                  this.id = id
                  this.name = name
                  this.description = description
                  this.estado = true
             },
             updateTask(){
                  axios.put(`http://localhost:3000/api/task/update/${this.id}`, {
                      name: this.name,
                      description: this.description
                  }).then(res => {
                      this.removeItem(this.id);
                      this.mytask.unshift(res.data);
                      this.id = null
                      this.name = null
                      this.description = null
                      this.estado = false
                  }).catch(err => {
                      console.error(err);
                  })
             },
             subtask(id){
                 axios.get('http://localhost:3000/api/subtask/')
                  .then(res => {
                      console.log(res.data);
                      this.mysubtask = res.data.filter(subtask => subtask.task_id === id);
                  }).catch(err => {
                      console.error(err);
                  });
             }

         },
         mounted() {
             this.obtainTask();
         }

     }
</script>
<style>
</style>