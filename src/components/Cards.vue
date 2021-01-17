<template lang="pug">
.flex.justify-center.w-full.p-6
  transition-group(v-for='(card, index) in currCards', :key='card.id')
    .w-40.mr-1.flex-col(:key='card.id * 2', :class='durationTime', class='sm:mr-2')
      .flex.relative.justify-center.h-0.pb-130-p.border.rounded-md.border-gray-400.transition.duration-500(
        :class='card.color'
      ) 
        .suit.absolute.top-0.left-0(:class='responsiveSize') ♠
        .font-light.pt-45-p(:class='responsiveSize') 
          | {{ cardValue(card.value) }}
        .suit.absolute.bottom-0.right-0(:class='responsiveSize') ♠
      p.text-xs.font-light(class='xs:text-sm sm:text-lg') {{ index }}
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
      return [this.currCards.length < 6 ? 'text-lg xs:text-2xl sm:text-4xl' : 'text-xs xs: sm:text-2xl xl:text-3xl'];
    },
    ...mapState(['cards', 'speed']),
    ...mapGetters(['currCards'])
  }
};
</script>

<style  scoped>
.moveDown {
  @apply relative transform translate-y-4 lg:translate-y-8 2xl:translate-y-12;
}

@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=Tinos:ital@1&display=swap');
.suit {
  font-family: 'M PLUS 1p', sans-serif;
}
</style>
