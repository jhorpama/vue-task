<template>
    <div>
        <Cabecera></Cabecera>
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
                    <!-- <pre>{{$data}}</pre>-->
                </b-col>
                <b-col md="6">
                    <h2 class="text-center mt-4" style="color: #fff;">My TASKS</h2>
                                <!--Tasks-->
                                <b-card v-for="task in mytask" :key="task._id" class="mt-4">
                                    <h2 class="text-center"><Octicon :icon="Octicons.trashcan" :scale="2"/></h2>
                                    <b-list-group>
                                         <b-list-group-item variant="primary"><h2 style="font-size: 18px; color: #000; text-align: center;">{{task.name}}</h2></b-list-group-item>
                                         <b-list-group-item variant="info"><h2 style="font-size: 16px; color: #000">{{task.description}}</h2></b-list-group-item>
                                         <b-list-group-item variant="warning"><h2 style="font-size: 14px; color: #000" v-text="formatDate(task.create_at)"></h2></b-list-group-item>
                                    </b-list-group>

                                    <!--Subtasks-->
                                    <ul v-for="mysubtask in subtasks" :key="mysubtask._id">
                                        <b-list-group  class="mt-1" v-if="task._id === mysubtask.mytask">
                                            <b-list-group-item variant="danger"><h2 style="font-size: 14px; color: #000">{{mysubtask.name}}</h2></b-list-group-item>
                                            <b-list-group-item><h2 style="font-size: 14px; color: #000" :class="{line: mysubtask.state}">{{mysubtask.description}}</h2></b-list-group-item>
                                            <b-list-group-item variant="success">
                                                <b-container>
                                                    <b-row>
                                                        <b-col>
                                                            <h2 @click="deleteSubTask(mysubtask._id)" class="text-center" style="color: #000; font-size: 10px;"><Octicon :icon="Octicons.x" :scale="1"/></h2>
                                                        </b-col>
                                                        <b-col>
                                                            <h2 @click="obtainSubtask(mysubtask._id, mysubtask.name, mysubtask.description)" style="color: #000; display: inline"><Octicon :icon="Octicons.pencil" :scale="1"/></h2>
                                                            <h2 @click="readySubtask(mysubtask._id)" style="color: #000; display: inline; margin-left: 20px;"><Octicon :icon="Octicons.checklist" :scale="1"/></h2>
                                                        </b-col>
                                                    </b-row>
                                                </b-container>
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
                                        <b-button v-if="subtaskstate" @click="editedSubtask" class="btn-block mt-3" variant="outline-success">Update SubTask</b-button>
                                        <h2 v-else @click="setSubtask(task._id)" class="text-center mt-1" style="color: #000; font-size: 10px;"><Octicon :icon="Octicons.plus" :scale="2"/></h2>
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
    import Cabecera from '../components/Cabecera'
    import { format } from 'timeago.js'
    import swal from 'sweetalert';
    export default{
         name: 'Task',
         components: {
             Octicon,
             Cabecera
         },
         data() {
             return {
                 name: null,
                 description: null,
                 id: null,
                 idsubtask: null,
                 estado: false,
                 subtaskname: null,
                 subtaskdescription: null,
                 subtaskstate: false,
                 format_create_at: null,
                 ready: true,
                 Octicons
             }
         },
         props: ['email']
         ,
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
                axios.post('https://api-of-tasks.herokuapp.com/api/task/add',{
                    name: this.name,
                    description: this.description,
                    email: this.email
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
             deleteTask(id){
                console.log(id);
                //SweetAlert
                swal({
                buttons: [true, "Deleted Task!"],
                title: "Are you sure?",
                text: "Are you sure that you want to delete this task?",
                icon: "warning",
                dangerMode: true,
                }).then(res => {
                    //Delete task
                    axios.delete(`https://api-of-tasks.herokuapp.com/api/task/delete/${id}`)
                        .then(res => {
                            //this.removeItem(res.data._id);
                                this.mytask.findIndex((valor, index) => {
                                        if(valor._id == res.data._id){
                                        this.mytask.splice(index, 1);
                                        }
                                });
                        }).catch(err => {
                            console.error(err);
                        });
                    //Delete task end
                    if (res) {
                      swal("Deleted!", "Your task has been deleted!", "success");
                    }
                }).catch(err => {
                    console.error(err);
                });
             },
             loadTask(id,name,description){
                  console.log(id,name,description);
                  this.id = id
                  this.name = name
                  this.description = description
                  this.estado = true
             },
             updateTask(){
                  axios.put(`https://api-of-tasks.herokuapp.com/api/task/update/${this.id}`, {
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
             async deleteSubTask(id){
                 console.log(id);
                 console.log('entro');
               axios.delete(`https://api-of-tasks.herokuapp.com/api/subtask/delete/${id}`)
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
                axios.post('https://api-of-tasks.herokuapp.com/api/subtask/add', {
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
             },
             obtainSubtask(id,name,description){
                console.log(id,name,description);
                this.idsubtask = id
                this.subtaskname = name
                this.subtaskdescription = description
                this.subtaskstate = true
             },
             editedSubtask(){
                axios.put(`https://api-of-tasks.herokuapp.com/api/subtask/update/${this.idsubtask}`,{
                    name: this.subtaskname,
                    description: this.subtaskdescription
                }).then(res => {
                    this.subtasks.findIndex((valor, index) => {
                        if(valor._id == res.data._id){
                            this.subtasks.splice(index, 1);
                        }
                    });
                    this.subtasks.push(res.data);
                    this.idsubtask = null
                    this.subtaskname = null
                    this.subtaskdescription = null
                    this.subtaskstate = false
                }).catch(err => {
                    console.error(err);
                })
             },
            formatDate(create){
                return format(create);
            },
            readySubtask(id){
               axios.put(`https://api-of-tasks.herokuapp.com/api/subtask/update/${id}`,{
                    state: true
                }).then(res => {
                    this.subtasks.findIndex((valor, index) => {
                        if(valor._id == res.data._id){
                            this.subtasks.splice(index, 1);
                        }
                    });
                    this.subtasks.unshift(res.data);
                }).catch(err => {
                    console.error(err);
                })
            },
         },
         updated() {
           //console.log('update');
         },
         mounted() {
            this.obtainTask({email: this.email});
            this.getSubtasks();
            this.email;
            this.formatDate();
         }

     }
</script>
<style>
body{
    background: #2c3e50;
    font-family: 'open sans';
}

.line{
    text-decoration: line-through;
}

</style>