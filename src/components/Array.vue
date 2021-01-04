<template lang="pug">
.flex.justify-center.w-full.px-4
  transition-group(name='list-complete')
    .w-40.transition(v-for='(number, index) in $store.getters.slicedArray', :key='number.id', :class='classObject')
      .flex.h-0.border-2.justify-center.transition.duration-500(
        :class='[[index == 0 ? "border-l-2" : "border-l-0"], $store.state.numbers[index].color]',
        style='padding-bottom: 100%'
      ) 
        .font-light.text-2xl(style='padding-top: 33%', class='sm:text-3xl') {{ number.value }}
</template>

<script>
export default {
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
