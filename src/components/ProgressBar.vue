<template lang="pug">
.flex.items-center.max-w-2xl.h-9.m-4.bg-light-navy.rounded.shadow-lg(class='md:mx-auto')
  img.bar-btn.ml-5(src='@/assets/fast-back.png', @click='firstStep')
  img.bar-btn(src='@/assets/back.png', @click='prevStep')
  img.bar-btn(@click='handlePlay', :src='playing ? require("@/assets/pause.png") : require("@/assets/play.png")')
  img.bar-btn(src='@/assets/forward.png', @click='nextStep')
  img.bar-btn(src='@/assets/fast-forward.png', @click='lastStep')
  .w-full
    input(type='range', min='0', :max='steps.length', v-model='currentStep', @input='jumpStep') 
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      playing: false
    };
  },

  methods: {
    // Handle animation playing/pausing
    handlePlay() {
      if (this.stepIndex != this.steps.length) {
        this.playing = !this.playing;
      }

      if (this.playing) {
        this.nextStep();
        this.setInterval(this.nextStep);
      } else {
        this.clearInterval();
      }
    },
    // Call the store mutation for the current step
    commitStep(stepIndex) {
      let mutation = this.steps[stepIndex].mutation;
      let payload = this.steps[stepIndex].payload;

      if (mutation) {
        this.$store.commit(mutation, payload);
      }
    },
    // Commit every mutation up until stepIndex value
    jumpStep() {
      this.undoMutations();
      for (let i = 0; i < this.stepIndex; i++) {
        this.commitStep(i);
      }
    },
    // Commit next step and increase stepIndex
    nextStep() {
      if (this.stepIndex <= this.steps.length - 1) {
        this.commitStep(this.stepIndex);
        this.increaseStep();
      }
    },
    // Reset mutations to previous step and decrease stepIndex
    prevStep() {
      if (this.stepIndex > 0) {
        this.decreaseStep();
        this.jumpStep();
      }
    },
    // Undo all mutations and set stepIndex to 0
    firstStep() {
      this.undoMutations();
      this.setStep(0);
    },
    // Commit all mutations in steps and set stepIndex to max
    lastStep() {
      this.setStep(this.steps.length);
      this.jumpStep();
    },
    ...mapMutations(['increaseStep', 'decreaseStep', 'setStep', 'undoMutations', 'setInterval', 'clearInterval'])
  },

  computed: {
    // Return index of next step in the animation
    currentStep: {
      get() {
        return this.stepIndex;
      },
      // Needed for v-model to work with a store state
      set(value) {
        this.setStep(value);
      }
    },
    ...mapState(['steps', 'stepIndex'])
  },

  watch: {
    // Stop animation and show play button when the last step is reached
    stepIndex() {
      if (this.stepIndex == this.steps.length) {
        this.playing = false;
        this.clearInterval();
      }
    },
    // Reset playing button along with animation
    steps() {
      this.playing = false;
    }
  }
};
</script>

<style>
.bar-btn {
  @apply h-6 mx-2 cursor-pointer;
}

/* Chrome, Safari, Opera */
input[type='range'] {
  -webkit-appearance: none;
  overflow: hidden;
  width: 80%;
  outline: none;
  cursor: pointer;
  background-color: #bcb3ff;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  cursor: pointer;
  background: #ffff;
  box-shadow: -30vw 0 0 30vw #ff4587;
}

/* Firefox */
input[type='range']::-moz-range-thumb {
  cursor: scroll;
  height: 25px;
}
input[type='range']::-moz-range-progress {
  background-color: #ff4587;
  height: 30px;
}
input[type='range']::-moz-range-track {
  background-color: #bcb3ff;
}
</style>
