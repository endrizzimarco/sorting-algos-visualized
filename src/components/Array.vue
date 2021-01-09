<template lang="pug">
.flex.justify-center.w-full.p-6
  transition-group(name='list-complete')
    .w-40.transition.shadow-lg(v-for='(number, index) in slicedArray', :key='number.id', :class='durationTime')
      .flex.justify-center.h-0.border.border-opacity-10.border-black.transition.duration-500(
        :class='[[index == 0 ? "" : "border-l-0"], numbers[index].color]',
        style='padding-bottom: 100%'
      ) 
        .font-light(style='padding-top: 33%', :class='[slicedArray.length < 6 ? "text-2xl" : "text-base"]', class='sm:text-3xl') 
          | {{ number.value }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    durationTime() {
      return {
        'duration-2000': this.speed == 'Slow',
        'duration-1000': this.speed == 'Average',
        'duration-500': this.speed == 'Fast'
      };
    },
    ...mapState(['numbers', 'speed']),
    ...mapGetters(['slicedArray'])
  }
};
</script>

<style  scoped>
.list-complete-leave-to {
  opacity: 0;
  transition: all 0.4s ease;
  transform: translateX(30px);
  position: relative;
}
</style>
