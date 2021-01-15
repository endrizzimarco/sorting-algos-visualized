<template lang="pug">
.flex.h-full.content-center 
  .flex.flex-col.m-auto.text-left.w-auto(class='sm:mx-5 sm:w-full lg:w-auto lg:m-auto')
    .mb-2.p-1.rounded-md.shadow-lg.bg-light-pink
      p.ml-3.whitespace-pre {{ currStep.explanation }}
    .px-2.py-2.bg-indigo-200.rounded-lg.shadow-lg(class='md:px-5')
      pre(
        v-for='(codeBlock, index) in currAlgoData.code',
        :class='[index == currStep.codeBlock ? "bg-indigo-500 rounded opacity-80 text-white" : ""]'
      ) {{ codeBlock }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    currStep() {
      if (this.stepIndex == 0) {
        return { explanation: `Showing code for ${this.algorithm}\nPress play to go through the code` };
      }
      return this.steps[this.stepIndex - 1];
    },
    ...mapState(['algorithm', 'steps', 'stepIndex']),
    ...mapGetters(['currAlgoData'])
  }
};
</script>
