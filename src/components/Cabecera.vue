<template>
    <div>
        <div id="nav">
          <router-link to="/task">Tasks</router-link> |
          <router-link to="/about">About</router-link>
        </div>
    </div>
</template>
<script>
   export default{
       name: 'Cabecera'
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
}

#nav a.router-link-exact-active {
  color: #9b59b6;
}
</style>