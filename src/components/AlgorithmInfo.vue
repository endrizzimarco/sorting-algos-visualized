<template lang="pug">
.flex.flex-wrap.mt-6.mb-20.mx-5.text-left
  .flex.w-full.pb-5
    h1.text-3xl Now showing: {{ $store.state.algorithm }}
  .flex.justify-center.pb-5.w-full(class='lg:w-6/12')
    table.table-auto.text-center
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
        tr(style='line-height: 2.5rem')
          td(v-for='complexity in algorithmInfo.complexities')
            code(:class='complexityColor(complexity)') {{ complexity }}
  .w-full(class='lg:w-6/12')
    p.mt-1 {{ algorithmInfo.text }}
    p.mt-2
      | Read more at:&nbsp
      a.underline.text-blue-600.cursor-pointer(class='hover:text-blue-800 visited:text-purple-600"') {{ algorithmInfo.wikipedia }}
</template>

<script>
export default {
  methods: {
    complexityColor(complexity) {
      console.log(typeof complexity);
      return {
        'px-3 py-1 rounded': true,
        'bg-green-300': /.\(1\)/gm.test(complexity),
        'bg-yellow-300': /.\(n\)/gm.test(complexity),
        'bg-yellow-500': /.\(n log\(n\)\)/gm.test(complexity),
        'bg-red-300': /.\(n\^2\)/gm.test(complexity)
      };
    }
  },
  computed: {
    algorithmInfo() {
      return this.$store.getters.currentInfo;
    }
  }
};
</script>

<style scoped>
td,
tr {
  padding: 0vw 3vw;
}

th {
  border-radius: 5px;
  padding: 3px;
  border: 1px solid #ddd9ff;
  background-image: linear-gradient(to bottom, #fff, #efedff);
  font-weight: normal;
}

table {
  border-collapse: separate;
  border-spacing: 4px;
}
</style>