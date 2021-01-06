<template lang="pug">
.flex.justify-around.mb-5.max-w-2xl.mx-auto
  .flex
    .w-6.h-6.bg-red-200.rounded 
    p.pl-2 Unsorted
  .flex
    .w-6.h-6.bg-green-200.rounded 
    p.pl-2 Sorted
  .flex
    .w-6.h-6.bg-yellow-200.rounded 
    p.pl-2 Comparing
  .flex(v-if='isPivotAlgorithm')
    .w-6.h-6.bg-purple-300.rounded 
    p.pl-1 Pivot
</template>

<script>
export default {
  computed: {
    isPivotAlgorithm() {
      return this.$store.state.algorithm == 'Quicksort';
    }
  }
};
</script>
