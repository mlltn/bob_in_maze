<template>
  <div id="app">
    <Experiment />
  </div>
</template>

<script>
import Experiment from './components/Experiment.vue';

export default {
  name: 'App',
  components: {
    Experiment,
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
