<template lang="pug">
.flex.justify-around.max-w-2xl.mx-5(class='sm:mt-5 sm:mx-auto')
  .legend-container
    .legend.border.border-gray-400
    p.legendName Unsorted
  .legend-container
    .legend.bg-green-200
    p.legendName Sorted
  .legend-container
    .legend.bg-yellow-200
    p.legendName Comparing
  .legend-container(v-if='isRequired')
    .legend.bg-purple-200
    p.legendName {{ legendContent }}
  .legend-container(v-if='isQuicksort')
    .legend.bg-blue-200
    p.legendName Pivot
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    isRequired() {
      return this.algorithm != 'BubbleSort';
    },
    isQuicksort() {
      return this.algorithm == 'Quicksort';
    },
    legendContent() {
      return this.isQuicksort ? 'pIndex' : 'Current';
    },
    ...mapState(['algorithm'])
  }
};
</script>

<style scoped>
.legend-container {
  @apply flex pr-1;
}

.legend {
  @apply w-5 h-5 rounded sm:w-6 sm:h-6;
}

.legendName {
  @apply pl-0.5 text-sm sm:text-base sm:pl-2;
}
</style>