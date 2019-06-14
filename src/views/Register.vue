<template>
     <div>
        <Cabecera></Cabecera>
        <b-container>
            <b-row>
                <b-col>
                   <section class="mt-5">
                       <h2 class="titulo">Lorem ipsum dolor sit.</h2>
                       <p class="parrafo">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio amet odit ex ipsa magni nam tenetur sit eaque?</p>
                       <p class="parrafo">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas hic laboriosam ab porro a, commodi ea corrupti, ad quam iure fugit cum veniam suscipit illum animi maxime neque deleniti quaerat!</p>
                   </section>
                </b-col>
                <b-col>
                    <b-card class="mt-5">
                        <b-form-group label="Email Address" description="We`ll share your email with anyone else">
                            <b-form-input
                                placeholder="Email Address"
                                v-model="email"
                                type="email"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group label="Your username">
                            <b-form-input
                                placeholder="Username"
                                v-model="username"
                                type="text"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group label="Your Password">
                            <b-form-input
                                placeholder="Password*"
                                v-model="password"
                                type="password"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-button @click="setdata" variant="outline-primary" class="btn-block">create an account</b-button>
                    </b-card>
                    <h2>{{message}}</h2>
                </b-col>
            </b-row>
        </b-container>
     </div>
</template>
<script>
  import Cabecera from '../components/Cabecera2'
  const axios = require('axios');
  export default{
      name: 'Register',
      components:{
         Cabecera
      },
      data(){
          return{
            email: null,
            password: null,
            username: null,
            message: null
          }
      },
      methods: {
          setdata(){
              axios.post('http://localhost:3000/api/register/', {
                  email: this.email,
                  password: this.password,
                  name: this.username
              }).then(res => {
                  this.message = res.data.email;
                  this.email = null;
                  this.username = null;
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
    background: #34495e;
    font-family: 'open sans';
}

.titulo{
    color: #ffffff;
    font-size: 85px;
    font-weight: 300;
    text-align: center;
}

.parrafo{
    color: #ffffff;
    font-weight: 300;
    text-align: justify;
    line-height: 24px;
}

</style>