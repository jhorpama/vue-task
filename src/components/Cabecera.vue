<template>
    <div>
        <div id="nav">
          <router-link to="/task">Tasks</router-link> |
          <a @click="goOut">Sign out</a>
        </div>
    </div>
</template>
<script>
   export default{
       name: 'Cabecera',
       methods: {
         goOut(){
           localStorage.removeItem('key');
           this.$router.push({name: 'login'});
         }
       },
   }
</script>
<style>
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  font-size: 24px;
}

#nav a.router-link-exact-active {
  color: #9b59b6;
}
</style>