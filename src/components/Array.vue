<template lang="pug">
.inline-block.h-28.w-28.border-2(
  v-for= "number in this.$store.state.numbers"
  :key= "number.id"
  :class="number.id != 0 ? 'border-l-0' : '' "
) {{ number.value }}
</template>

<script>
export default {
  name: 'Array'
};
</script>
