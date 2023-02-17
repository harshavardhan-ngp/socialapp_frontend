<template>
  <div id="app">
    <component :is="layout">
      <RouterView></RouterView>
    </component>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'Default') + 'Layout'
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
