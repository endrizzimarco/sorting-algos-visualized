<template lang="pug">
.flex.justify-around
  p.bg-indigo-200

  .flex.flex-col
    .flex(v-for='block in algoCode')
      pre {{ block.code }}
</template>

<script>
export default {
  computed: {
    algoCode() {
      return this.$store.getters.currAlgoDetails.implementation;
    }
  }
};
</script>
