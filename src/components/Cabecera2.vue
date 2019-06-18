<template>
    <div>
        <div id="nav">
          <router-link to="/">Home</router-link> |
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
  font-family: 'open sans';
  font-size: 18px;
}

#nav a.router-link-exact-active {
  color: #9b59b6;
}
</style>