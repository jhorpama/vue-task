<template>
    <div>
        <div id="nav">
          <router-link to="/login">Sign in</router-link> |
          <router-link to="/register">Sign up</router-link>
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
  color: #42b983;
}
</style>