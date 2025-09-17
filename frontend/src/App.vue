<template>
  <div id="app">
    <h1>Vue + FastAPI App</h1>
    <TodoApp />
  </div>
</template>

<script lang="ts">
import TodoApp from './Todo.vue'

export default {
  components: { TodoApp }
}
</script>
