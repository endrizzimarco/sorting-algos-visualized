<template lang="pug">
.flex.justify-around.max-w-2xl.mx-5(class='sm:mt-5 sm:mx-auto')
  .flex
    .legend.border.border-gray-300
    p.legendName Unsorted
  .flex
    .legend.bg-green-200
    p.legendName Sorted
  .flex
    .legend.bg-yellow-200
    p.legendName Comparing
  .flex(v-if='isRequired')
    .legend.bg-purple-200
    p.legendName Pivot
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    isRequired() {
      return this.algorithm == ('Quicksort' || 'Insertion Sort');
    },
    legendName() {
      let name = this.algorithm == 'Quicksort' ? 'Pivot' : 'Current';
      return name;
    },
    ...mapState(['algorithm'])
  }
};
</script>