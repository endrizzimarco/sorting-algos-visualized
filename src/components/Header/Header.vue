<template lang="pug">
nav.flex.flex-wrap.items-center.px-3.bg-light-navy.text-white.py-3.shadow-xl
  // Yummy burger fix it someday
  input#menu-btn.menu-btn.hidden(type='checkbox')
  label.menu-icon.cursor-pointer.px-2.py-4(class='md:hidden', for='menu-btn')
    span.navicon.flex.relative
  // Title
  .flex.py-3.ml-4(class='md:mr-6')
    span.font-semibold.text-xl.tracking-tight(class='md:text-2xl') Sorting Algorithms Visualizer
  // Content
  .menu.flex.flex-grow.w-full.justify-start(class='md:w-auto xl:justify-end')
    Attribute(:items='$store.state.options.algorithms') Algorithms
    Attribute Numbers
    Attribute(:items='$store.state.options.sizes', @selected='size = $event') Size: {{ size }}
    Attribute(:items='$store.state.options.speeds', @selected='speed = $event') Speed: {{ speed }}
    Attribute Shuffle
    button.bg-sky-blue.text-2xl.px-6.py-2.rounded.transition.duration-500(
      @click='commitChanges(algorithm, size, speed)',
      class='hover:bg-dark-sky-blue md:ml-4'
    ) Visualize!
</template>

<script>
import Attribute from '@/components/Header/Attribute.vue';

export default {
  name: 'Header',
  components: { Attribute },
  beforeMount() {
    this.algorithm = this.$store.state.algorithm;
    this.numbers = this.$store.state.numbers;
    this.size = this.$store.state.size;
    this.speed = this.$store.state.speed;
  },
  data() {
    return {
      algorithm: '',
      numbers: [],
      size: 0,
      speed: ''
    };
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .navicon {
    width: 1.125em;
    height: 0.125em;
  }

  .navicon::before,
  .navicon::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-out;
    content: '';
    background: white;
  }

  .navicon::before {
    top: 5px;
  }

  .navicon::after {
    top: -5px;
  }

  .menu-btn:not(:checked) ~ .menu {
    display: none;
  }

  .menu-btn:checked ~ .menu {
    display: block;
  }

  .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }

  .menu-btn:checked ~ .menu-icon .navicon::before {
    transform: rotate(-45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::after {
    transform: rotate(45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::before,
  .menu-btn:checked ~ .menu-icon .navicon::after {
    top: 0;
  }
}
</style>