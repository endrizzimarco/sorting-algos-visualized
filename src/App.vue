<template lang="pug">
.grid.grid-cols-8.min-h-screen
  .col-span-full
    Header
  .col-span-full
    AlgorithmInfo
  .col-span-full(class='lg:col-span-5')
    AlgorithmLegend
    Array
  .col-span-full(class='lg:col-span-3')
    AlgorithmCode
  .col-span-full
    ProgressBar
</template>

<script>
import Header from './components/Header/Header.vue';
import AlgorithmInfo from './components/AlgorithmInfo.vue';
import AlgorithmLegend from './components/AlgorithmLegend.vue';
import Array from './components/Array.vue';
import AlgorithmCode from './components/AlgorithmCode.vue';
import ProgressBar from './components/ProgressBar.vue';

export default {
  components: {
    Header,
    AlgorithmInfo,
    AlgorithmLegend,
    Array,
    AlgorithmCode,
    ProgressBar
  },
  beforeMount() {
    this.$store.commit('generateNumbers');
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
