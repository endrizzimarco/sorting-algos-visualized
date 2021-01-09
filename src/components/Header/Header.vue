<template lang="pug">
nav.flex.flex-wrap.items-center.px-3.bg-light-navy.text-white.py-2.shadow-xl
  // Yummy burger fix it someday
  input#menu-btn.menu-btn.hidden(type='checkbox')
  label.menu-icon.cursor-pointer.px-2.py-4(class='md:hidden', for='menu-btn')
    span.navicon.flex.relative
  // Title
  .flex.py-3.ml-4(class='md:mr-6')
    span.font-semibold.text-xl.tracking-tight(class='sm:text-2xl') Sorting Algorithms Visualizer
  // Content
  .menu.flex.flex-grow.w-full.justify-start(class='md:w-auto xl:justify-end')
    Option(:value='algorithm', :items='options.algorithms', @selected='localAlgo = $event') Algorithms
    Option(
      :key='reloadWithProp',
      :value='"Insert " + size + " numbers"',
      :items='localNumbers',
      :input='true',
      @selected='localNumbers = $event'
    ) Numbers
    Option(:value='size', :items='options.sizes', @selected='localSize = $event') Size: {{ localSize }}
    Option(:value='speed', :items='options.speeds', @selected='localSpeed = $event') Speed: {{ localSpeed }}
    div(@click='generateNumbers([])')
      Option Shuffle
    button.bg-sky-blue.text-2xl.px-6.py-2.rounded.transition.duration-500(
      @click='handleClick',
      class='hover:bg-dark-sky-blue focus:outline-none md:ml-4'
    ) Visualize!
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import Option from '@/components/Header/Option.vue';

export default {
  components: { Option },

  data() {
    return {
      localAlgo: '',
      localNumbers: [],
      localSize: 0,
      localSpeed: '',
      reloadWithProp: 0
    };
  },

  methods: {
    handleClick() {
      this.changeOptions(this.localOptions);
      document.getElementById('menu-btn').checked = false;
    },
    ...mapMutations(['generateNumbers', 'changeOptions'])
  },

  computed: {
    localOptions() {
      return {
        algo: this.localAlgo,
        numbers: this.localNumbers,
        size: this.localSize,
        speed: this.localSpeed
      };
    },
    ...mapState(['algorithm', 'numbers', 'size', 'speed', 'options']),
    ...mapGetters(['slicedArray'])
  },

  beforeMount() {
    this.localAlgo = this.algorithm;
    this.localSize = this.size;
    this.localSpeed = this.speed;
    this.slicedArray.forEach(x => this.localNumbers.push(x.value));
  },

  watch: {
    numbers() {
      this.localNumbers = [];
      this.reloadWithProp += 1;
      this.slicedArray.forEach(x => this.localNumbers.push(x.value));
    }
  }
};
</script>

// Hamburger button animations
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