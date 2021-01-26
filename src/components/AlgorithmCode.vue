<template lang="pug">
.flex.h-full.content-center 
  .flex.flex-col.m-auto.w-auto.text-left(class='sm:mx-5 sm:w-full lg:w-auto lg:m-auto')
    .mb-2.p-1.rounded-md.shadow-lg.bg-light-pink
      p.ml-3.whitespace-pre {{ currStep.explanation }}
    .px-2.py-2.bg-indigo-200.rounded-lg.shadow-lg(class='md:px-5')
      pre(
        v-for='(codeBlock, index) in currAlgoData.code',
        :class='{ "bg-indigo-500 rounded opacity-80 text-white": index == currStep.codeBlock }'
      ) {{ codeBlock }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    // Return the data for the current step
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
