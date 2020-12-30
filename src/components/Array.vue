<template lang="pug">
.flex.w-full.justify-center.px-1
  transition-group(name='list-complete')
    .w-40.transition(v-for='(number, index) in $store.getters.slicedArray', :key='number.id', :class='classObject')
      .flex.h-0.border-2.justify-center(
        :class='index == 0 ? "border-l-2" : "border-l-0"',
        style='padding-bottom: 100%'
      ) 
        .font-light.text-2xl(style='padding-top: 33%', class='sm:text-3xl') {{ number.value }}
button(@click='$store.commit("test")') Shuffle
</template>

<script>
export default {
  name: 'Array',
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      nextNum: 10
    };
  },
  computed: {
    classObject() {
      return {
        'duration-2000': this.$store.state.speed == 'Slow',
        'duration-1000': this.$store.state.speed == 'Average',
        'duration-500': this.$store.state.speed == 'Fast'
      };
    }
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
