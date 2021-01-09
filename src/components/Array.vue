<template lang="pug">
.flex.justify-center.w-full.p-6
  transition-group(name='list-complete')
    .w-40.mr-1.relative(v-for='(number, index) in slicedArray', :key='number.id', :class='durationTime', class='sm:mr-2')
      .flex.justify-center.h-0.pb-130-p.border.rounded-md.border-gray-300.transition.duration-500(
        :class='[numbers[index].color]'
      ) 
        .suit.absolute.top-0.left-0(:class='responsiveSize') ♠
        .font-light.pt-45-p(:class='responsiveSize') 
          | {{ cardValue(number.value) }}
        .suit.absolute.bottom-0.right-0(:class='responsiveSize') ♠
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  methods: {
    cardValue(n) {
      switch (n) {
        case 1:
          return 'A';
        case 11:
          return 'J';
        case 12:
          return 'Q';
        case 13:
          return 'K';
        default:
          return n;
      }
    }
  },

  computed: {
    durationTime() {
      return {
        'duration-2000': this.speed == 'Slow',
        'duration-1000': this.speed == 'Average',
        'duration-500': this.speed == 'Fast'
      };
    },
    responsiveSize() {
      return [
        this.slicedArray.length < 6
          ? 'text-lg xs:text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl'
          : 'text-xs xs: sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl'
      ];
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

@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=Tinos:ital@1&display=swap');
.suit {
  font-family: 'M PLUS 1p', sans-serif;
}
</style>
