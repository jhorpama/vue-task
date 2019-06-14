<template>
    <div>
        <Cabecera></Cabecera>
        <b-container>
             <b-row>
                 <b-col>
                    <section class="mt-5">
                        <h2 class="titulo">Lorem, ipsum.</h2>
                        <p class="parrafo">Lorem ipsum dolor sit amet.</p>
                        <p class="parrafo">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
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
        <pre>{{$data}}</pre>
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
               axios.post('http://localhost:3000/api/login', {
                  email: this.email,
                  password: this.password
               }).then(res => {
                   if(res.data.token !== undefined){
                      localStorage.setItem('key', res.data.token);
                      this.$router.push({ name: 'home' });
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
<style>
body{
    background: #2c3e50;
    font-family: 'open sans';
}

.titulo{
    color: #ffffff;
    font-size: 85px;
    text-align: center;
}

.parrafo{
    color: #ffffff;
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