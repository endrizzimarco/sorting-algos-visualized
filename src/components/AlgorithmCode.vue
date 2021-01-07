<template lang="pug">
.flex.w-full
  .flex.flex-col.m-auto.text-left
    .mb-2.p-1.rounded-md.shadow-lg.bg-light-pink
      p.ml-3.whitespace-pre {{ currStep.explanation }}
    .px-5.py-2.bg-indigo-200.rounded-lg.shadow-lg
      pre(
        v-for='(codeBlock, index) in currAlgoData.code',
        :class='[index == currStep.codeBlock ? "bg-indigo-400 text-white" : ""]'
      ) {{ codeBlock }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    currStep() {
      if (this.stepIndex == 0) {
        return { codeBlock: 'block1', explanation: 'bojo\nbim bim bom bom' };
      }
      return this.steps[this.stepIndex - 1];
    },
    ...mapState(['steps', 'stepIndex']),
    ...mapGetters(['currAlgoData'])
  }
};
</script>
