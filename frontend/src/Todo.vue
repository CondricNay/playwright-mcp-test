<template>
  <div class="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-4 text-center text-indigo-600">My TODO List</h2>

    <!-- Add new TODO -->
    <div class="flex mb-4">
      <input
        v-model="newTodo"
        placeholder="Add a new task..."
        @keyup.enter="addTodo"
        class="border rounded-l px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        @click="addTodo"
        class="bg-indigo-500 text-white px-4 py-2 rounded-r hover:bg-indigo-600 transition-colors"
      >
        Add
      </button>
    </div>

    <!-- List TODOs -->
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex justify-between items-center mb-2 p-2 rounded hover:bg-indigo-50 transition-colors"
      >
        <!-- Toggle completed on click -->
        <span
          :class="{
            'line-through text-gray-400': todo.completed,
            'cursor-pointer text-gray-800': !todo.completed
          }"
          @click="toggle(todo)"
        >
          {{ todo.title }}
        </span>
        <!-- Delete button -->
        <button
          @click="remove(todo.id)"
          class="text-red-500 hover:text-red-700 font-bold ml-2"
        >
          ✕
        </button>
      </li>

      <!-- Message if list is empty -->
      <li v-if="todos.length === 0" class="text-gray-500 italic text-center py-4">
        No TODOs yet
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue"

export default {
  setup() {
    const API_BASE = "http://127.0.0.1:8000" // backend URL
    const todos = ref<any[]>([])
    const newTodo = ref("")

    const fetchTodos = async () => {
      try {
        const res = await fetch(`${API_BASE}/todos`)
        todos.value = await res.json()
      } catch (err) {
        console.error("Failed to fetch todos:", err)
      }
    }

    const addTodo = async () => {
      if (!newTodo.value) return
      try {
        await fetch(`${API_BASE}/todos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTodo.value })
        })
        newTodo.value = ""
        fetchTodos()
      } catch (err) {
        console.error("Failed to add todo:", err)
      }
    }

    const toggle = async (todo: any) => {
      try {
        await fetch(`${API_BASE}/todos/${todo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: todo.title, completed: !todo.completed })
        })
        fetchTodos()
      } catch (err) {
        console.error("Failed to toggle todo:", err)
      }
    }

    const remove = async (id: number) => {
      try {
        await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" })
        fetchTodos()
      } catch (err) {
        console.error("Failed to delete todo:", err)
      }
    }

    onMounted(fetchTodos)

    return { todos, newTodo, addTodo, toggle, remove }
  }
}
</script>

<style>
.line-through {
  text-decoration: line-through;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
