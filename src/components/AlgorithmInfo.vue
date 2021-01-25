<template lang="pug">
.flex.flex-wrap.my-3.mx-5.pb-5
  //- 'Now showing' header
  .flex.w-full.pb-5
    h1.text-2xl(class='sm:text-3xl') Now showing: {{ algorithm }}
    //- Dropdown SVG icon
    svg.ml-1.mt-2.h-5.w-5.cursor-pointer(
      @click='toggle = !toggle',
      class='lg:hidden',
      xmlns='http://www.w3.org/2000/svg',
      viewbox='0 0 20 20',
      fill='currentColor',
      aria-hidden='true'
    )
      path(
        fill-rule='evenodd',
        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
        clip-rule='evenodd'
      )
  //- Complexities table
  .flex.justify-center.pb-5(v-show='toggle', class='lg:w-6/12 lg:pr-4')
    table.table-fixed.w-full.text-center
      thead
        tr
          th(colspan=3) Time Complexity
          th Space Complexity
        tr 
          th Best
          th Average
          th Worst
          th Worst
      tbody
        tr.leading-10
          td(v-for='complexity in currAlgoData.complexities')
            code.p-1.rounded.text-xxs(:class='complexityColor(complexity)', class='sm:px-3 sm:text-base') {{ complexity }}
  //- Algorithm text info
  .w-full(v-show='toggle', class='lg:w-6/12')
    p.text-justify {{ currAlgoData.text }}
    p.text-left.mt-2
      | Read more at:&nbsp
      a.inline-block.underline.text-blue-600.cursor-pointer(
        :href='currAlgoData.wikipedia',
        target='_blank',
        class='hover:text-blue-800 visited:text-purple-600'
      ) {{ currAlgoData.wikipedia }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      toggle: true
    };
  },

  methods: {
    //- Makes the toggle appear next to header on a small screen
    toggleOnResize() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (width > 1024) {
        this.toggle = true;
      }
    },
    //- Returns the color class for a given complexity
    complexityColor(complexity) {
      return {
        'bg-green-300': /.\(1\)/gm.test(complexity),
        'bg-chartreuse bg-opacity-40': /.\(log\(n\)\)/gm.test(complexity),
        'bg-yellow-200': /.\(n\)/gm.test(complexity),
        'bg-yellow-500 bg-opacity-50': /.\(n log\(n\)\)/gm.test(complexity),
        'bg-red-300': /.\(n\^2\)/gm.test(complexity)
      };
    }
  },

  computed: {
    ...mapState(['algorithm']),
    ...mapGetters(['currAlgoData'])
  },

  //- Add resize listener, used by toggleOnResize()
  beforeMount() {
    window.addEventListener('resize', this.toggleOnResize);
  }
};
</script>

<style scoped>
th {
  border-radius: 5px;
  padding: 3px;
  border: 1px solid #ddd9ff;
  background-image: linear-gradient(to bottom, #fff, #efedff);
  font-weight: normal;
  font-size: 0.85em;
  @apply sm:text-base;
}

table {
  border-collapse: separate;
  border-spacing: 4px;
}
</style>