<template lang="pug">
.flex.flex-col
  .flex.ml-10(v-for='line in $store.getters.currentCode')
    pre {{ line }}
</template>

<script>
export default {};
</script>
