<template>
    <div>
       <section class="fondo">
         <b-container>
             <b-row>
                 <b-col>
                    <Cabecera></Cabecera>
                 </b-col>
             </b-row>
         </b-container>
         <b-container>
             <b-row>
                 <b-col>
                     <h2 class="titulo">Week Tasks</h2>
                     <p class="parrafo">
                        webtasks is an application that allows you to manage all the activities of the week,
                        and maintain control without forgetting your tasks,
                        it also allows you to add subtaks and finish them when appropriate.
                    </p>
                    <b-button variant="outline-success" to="/register">SIGN UP</b-button>
                 </b-col>
             </b-row>
         </b-container>
       </section>
    </div>
</template>
<script>
 import Cabecera from  '../components/Cabecera2'
 export default{
     name: 'Home',
     components:{
        Cabecera
     },
     data(){
         return{

         }
     }
 }
</script>
<style scoped>
.fondo{
    width: 100%;
    height: 750px;
    background-image: url(../../public/fondo.png);
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
}

body{
    font-family: 'open sans';
}

.titulo{
    font-size: 76px;
    color: #2c3e50;
}

.parrafo{
    font-size: 20px;
    color: #1d1d11;
}

</style>