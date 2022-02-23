<template>
  <div id="app">
    <Wordsearch />
  </div>
</template>

<script>
import Wordsearch from "./components/Wordsearch";

export default {
  name: "App",
  components: {
    Wordsearch,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
