<template>
  <div>
     <Cabecera></Cabecera>
     <Task></Task>
  </div>
</template>

<script>

import Task from '../components/Task'
import Cabecera from '../components/Cabecera'

export default {
  name: 'home',
  components: {
    Task,
    Cabecera
  }
}
</script>
