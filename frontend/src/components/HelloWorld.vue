<template>
  <div>
    <p>{{ message }}</p>
    <button @click="fetchMessage">Get Message from FastAPI</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Click the button to fetch from FastAPI"
    }
  },
  methods: {
    async fetchMessage() {
      try {
        const res = await fetch("http://localhost:8000/api/hello")
        const data = await res.json()
        this.message = data.message
      } catch (err) {
        this.message = "Error fetching message"
      }
    }
  }
}
</script>
