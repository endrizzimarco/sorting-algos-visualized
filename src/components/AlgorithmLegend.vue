<template lang="pug">
.flex.justify-around.max-w-2xl.mx-5(class='sm:mt-5 sm:mx-auto')
  .flex
    .legend.border.border-gray-400
    p.legendName Unsorted
  .flex
    .legend.bg-green-200
    p.legendName Sorted
  .flex
    .legend.bg-yellow-200
    p.legendName Comparing
  .flex(v-if='isRequired')
    .legend.bg-purple-200
    p.legendName Current
  .flex(v-if='isQuicksort')
    .legend.bg-blue-200
    p.legendName Pivot
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    isRequired() {
      return this.algorithm != 'Bubble Sort';
    },
    isQuicksort() {
      return this.algorithm == 'Quicksort';
    },
    ...mapState(['algorithm'])
  }
};
</script>

<style scoped>
.legend {
  @apply w-5 h-5 rounded sm:w-6 sm:h-6;
}
.legendName {
  @apply pl-1 text-sm sm:text-base sm:pl-2;
}
</style>