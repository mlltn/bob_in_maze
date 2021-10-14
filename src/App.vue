<template>
  <div id="app">
    <Conductor />
  </div>
</template>

<script>
import Conductor from './components/Conductor.vue';
import { preventNav } from './logic/utils.js';
export default {
  name: 'App',
  components: {
    Conductor,
  },
  created() {
    document.title = 'Bob in Maze';
  },
  beforeMount() {
    window.addEventListener('beforeunload', preventNav);
  },

  beforeDestroy() {
    window.removeEventListener('beforeunload', preventNav);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.centered {
  margin-left: auto;
  margin-right: auto;
  /*whatever width you want*/
}
</style>
