<template>
    <div class="body">
        <Cabecera></Cabecera>
        <b-container>
             <b-row>
                 <b-col>
                    <section class="mt-5">
                        <h2 class="titulo">Week, Tasks.</h2>
                        <p class="parrafo">What are you waiting for to fake control.</p>
                        <p class="parrafo">Do not miss any pending work.</p>
                    </section>
                 </b-col>
                 <b-col>
                     <b-card class="mt-5">
                         <b-form-group label="Email Address:" description="We`ll never share your email with anyone else!">
                             <b-form-input
                                placeholder="Enter Your Email"
                                type="email"
                                v-model="email"
                                required
                             ></b-form-input>
                         </b-form-group>
                         <b-form-group label="Password">
                             <b-form-input
                                placeholder="Enter Your Password"
                                type="password"
                                v-model="password"
                                required
                             ></b-form-input>
                         </b-form-group>
                         <b-button @click="getToken" class="btn-block" variant="outline-success">Sign In</b-button>
                     </b-card>
                     <h2 class="message">{{message}}</h2>
                 </b-col>
             </b-row>
        </b-container>
    </div>
</template>
<script>
   import Cabecera from '../components/Cabecera2'
   const axios = require('axios');
   export default{
       name: 'Login',
       components: {
           Cabecera
       },
       data(){
           return {
             email: null,
             password: null,
             message: null,
           }
       },
       updated(){

       },
       methods: {
           getToken(){
               axios.post('https://api-week-tasks.herokuapp.com/api/login', {
                  email: this.email,
                  password: this.password
               }).then(res => {
                   if(res.data.token !== undefined){
                      localStorage.setItem('key', res.data.token);
                      this.$router.push({ name: 'task', params: { email: this.email } });
                   }else if(res.data.message){
                      this.message = res.data.message;
                   }
                   this.email = null;
                   this.password = null;
               }).catch(err => {
                   console.error(err);
               })
           }
       },
   }
</script>
<style scoped>
.body{
    background: #2c3e50;
    font-family: 'open sans';
}

.titulo{
    color: #27ae60;
    font-size: 85px;
    text-align: center;
}

.parrafo{
    color: #ffffff;
    font-size: 24px;
    line-height: 24px;
    text-align: justify;
    font-weight: 300;
}

.message{
    color: #DE404D;
    font-size: 2rem;
    text-align: center;
}

</style>