<template>
    <div>
        <b-container>
            <b-row>
                <b-col md="6">
                     <h2 class="text-center" style="color: #fff;">ADD TASK</h2>
                     <b-card class="mt-4">
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
                     <pre>{{$data}}</pre>
                </b-col>
                <b-col md="6">
                    <h2 class="text-center" style="color: #fff;">My TASKS</h2>
                                <!--Tasks-->
                                <b-card v-for="task in mytask" :key="task._id" class="mt-4">
                                    <h2 class="text-center"><Octicon :icon="Octicons.trashcan" :scale="2"/></h2>
                                    <b-list-group>
                                         <b-list-group-item variant="primary"><h2 style="font-size: 18px; color: #000; text-align: center;">{{task.name}}</h2></b-list-group-item>
                                         <b-list-group-item variant="info"><h2 style="font-size: 16px; color: #000">{{task.description}}</h2></b-list-group-item>
                                         <b-list-group-item variant="warning"><h2 style="font-size: 14px; color: #000">{{task.create_at}}</h2></b-list-group-item>
                                    </b-list-group>

                                    <!--Subtasks-->
                                    <ul v-for="mysubtask in subtasks" :key="mysubtask._id">
                                        <b-list-group  class="mt-1" v-if="task._id === mysubtask.mytask">
                                            <b-list-group-item variant="danger"><h2 style="font-size: 14px; color: #000">{{mysubtask.name}}</h2></b-list-group-item>
                                            <b-list-group-item><h2 style="font-size: 14px; color: #000">{{mysubtask.description}}</h2></b-list-group-item>
                                            <h2>{{mysubtask._id}}</h2>
                                            <b-list-group-item variant="success">
                                                <b-row>
                                                    <b-col>
                                                        <h2 @click="deleteSubTask(mysubtask._id)" class="text-center" style="color: #000; font-size: 10px;"><Octicon :icon="Octicons.x" :scale="1"/></h2>
                                                    </b-col>
                                                    <b-col>
                                                        <h2 class="text-center" style="color: #000; font-size: 10px;"><Octicon :icon="Octicons.pencil" :scale="1"/></h2>
                                                    </b-col>
                                                </b-row>
                                            </b-list-group-item>
                                        </b-list-group>
                                    </ul>
                                    <!--End Subtasks-->
                                    <b-card class="mt-2">
                                        <b-form-input
                                        type="text"
                                        placeholder="Enter the name of the SubTask"
                                        v-model="subtaskname"
                                        ></b-form-input>
                                        <b-form-textarea
                                        class="mt-4"
                                        placeholder="Enter the description of the SubTask"
                                        v-model="subtaskdescription"
                                        rows="3"
                                        max-rows="3"
                                        ></b-form-textarea>
                                        <b-button v-if="estado" @click="updateTask" class="btn-block mt-3" variant="outline-success">Update SubTask</b-button>
                                        <h2 @click="setSubtask(task._id)" class="text-center mt-1" style="color: #000; font-size: 10px;"><Octicon :icon="Octicons.plus" :scale="2"/></h2>
                                    </b-card>
                                    <b-card-body>
                                        <b-button class="m-3" @click="loadTask(task._id, task.name, task.description)" variant="outline-primary">Update</b-button>
                                        <b-button @click="deleteTask(task._id)" variant="outline-danger">Delete</b-button>
                                    </b-card-body>
                                </b-card>
                            <!--End Tasks-->
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
     import { mapState, mapActions } from 'vuex'
     const axios = require('axios');
     const { Octicon, Octicons } = require('octicons-vue')
     export default{
         name: 'Task',
         components: {
             Octicon
         },
         data() {
             return {
                 name: null,
                 description: null,
                 id: null,
                 estado: false,
                 subtaskname: null,
                 subtaskdescription: null,
                 Octicons
             }
         },
         computed: {
             ...mapState([
                 'mytask',
                 'subtasks'
             ])
         },
         methods: {
             ...mapActions([
                 'obtainTask',
                 'getSubtasks'
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
                    console.log(index);
             },
             async deleteTask(id){
                 console.log(id);
                 await axios.delete(`http://localhost:3000/api/task/delete/${id}`)
                      .then(res => {
                           //this.removeItem(res.data._id);
                            this.mytask.findIndex((valor, index) => {
                                    if(valor._id == res.data._id){
                                    this.mytask.splice(index, 1);
                                    }
                            });
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
             deleteSubTask(id){
               axios.delete(`http://localhost:3000/api/subtask/delete/${id}`)
                            .then(res => {
                                console.info(res.data._id);
                                this.subtasks.findIndex((valor, index) => {
                                    if(valor._id == res.data._id){
                                    this.subtasks.splice(index, 1);
                                    }
                                });
                            }).catch(err => {
                                console.error(err);
                            })
             },
             setSubtask(id){
                axios.post('http://localhost:3000/api/subtask/add', {
                   name: this.subtaskname,
                   description: this.subtaskdescription,
                   mytask: id
                }).then(res => {
                    this.subtasks.push(res.data);
                    this.subtaskname = null
                    this.subtaskdescription = null
                }).catch(err => {
                    console.error(err);
                })
             }
         },
         updated() {
           //console.log('update');
         },
         mounted() {
             this.obtainTask();
             this.getSubtasks();
         }

     }
</script>
<style>
</style>