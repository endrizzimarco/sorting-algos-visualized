<template lang="pug">
.flex.items-center.max-w-2xl.h-9.m-4.bg-light-navy.rounded.shadow-lg(class='md:mx-auto')
  img.h-6.mx-2.ml-5.cursor-pointer(src='@/assets/fast-back.png', @click='firstStep')
  img.h-6.mx-2.cursor-pointer(src='@/assets/back.png', @click='prevStep')
  img.h-6.mx-2.cursor-pointer(
    @click='handlePlay',
    :src='playing ? require("@/assets/pause.png") : require("@/assets/play.png")'
  )
  img.h-6.mx-2.cursor-pointer(src='@/assets/forward.png', @click='nextStep')
  img.h-6.mx-2.cursor-pointer(src='@/assets/fast-forward.png', @click='lastStep')
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
    handlePlay() {
      this.playing = !this.playing;
      if (this.playing) {
        this.nextStep();
        this.setInterval(this.nextStep);
      } else {
        this.clearInterval();
      }
    },
    commitStep(stepIndex) {
      let mutation = this.steps[stepIndex].mutation;
      let payload = this.steps[stepIndex].payload;
      if (mutation) {
        this.$store.commit(mutation, payload);
      }
    },
    nextStep() {
      if (this.stepIndex <= this.steps.length - 1) {
        this.commitStep(this.stepIndex);
        this.increaseStep();
      }
    },
    prevStep() {
      if (this.stepIndex > 0) {
        this.undoMutations();
        for (let i = 0; i < this.stepIndex - 1; i++) {
          this.commitStep(i);
        }
        this.decreaseStep();
      }
    },
    firstStep() {
      this.undoMutations();
      this.setStep(0);
    },
    lastStep() {
      this.undoMutations();
      for (let i = 0; i < this.steps.length; i++) {
        this.commitStep(i);
      }
      this.setStep(this.steps.length);
    },
    jumpStep() {
      this.undoMutations();
      for (let i = 0; i < this.stepIndex; i++) {
        this.commitStep(i);
      }
    },
    ...mapMutations(['increaseStep', 'decreaseStep', 'setStep', 'undoMutations', 'setInterval', 'clearInterval'])
  },
  computed: {
    currentStep: {
      get() {
        return this.stepIndex;
      },
      set(value) {
        this.setStep(value);
      }
    },
    ...mapState(['steps', 'stepIndex'])
  },
  watch: {
    stepIndex() {
      if (this.stepIndex == this.steps.length) {
        this.playing = false;
        this.clearInterval();
      }
    }
  }
};
</script>

<style>
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

/** FF*/
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
