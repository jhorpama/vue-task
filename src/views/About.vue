<template>
     <div>
        <Cabecera></Cabecera>
        <b-container>
           <b-row>
             <b-col>
                 <h2>About</h2>
             </b-col>
           </b-row>
        </b-container>
     </div>
</template>
<script>
   import Cabecera from '../components/Cabecera'
   export default{
     name: 'About',
     components: {
       Cabecera
     }
   }
</script>
