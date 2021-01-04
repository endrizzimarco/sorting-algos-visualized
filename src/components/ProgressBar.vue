<template lang="pug">
.flex.items-center.max-w-2xl.h-9.mx-4.mt-6.bg-light-navy.rounded(class='md:mx-auto')
  img.h-6.mx-2.ml-5.cursor-pointer(src='@/assets/fast-back.png', @click='firstStep')
  img.h-6.mx-2.cursor-pointer(src='@/assets/back.png', @click='prevStep')
  img.h-6.mx-2.cursor-pointer(
    @click='handlePlay',
    :src='playing ? require("@/assets/pause.png") : require("@/assets/play.png")'
  )
  img.h-6.mx-2.cursor-pointer(src='@/assets/forward.png', @click='nextStep')
  img.h-6.mx-2.cursor-pointer(src='@/assets/fast-forward.png', @click='lastStep')
  .w-full
    input(type='range', min='0', :max='steps.length', v-model='currentStep', @change='jumpStep') 
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      playing: false,
      interval: ''
    };
  },
  methods: {
    handlePlay() {
      this.playing = !this.playing;
      if (this.playing) {
        this.interval = setInterval(this.nextStep, 1000);
      } else {
        clearInterval(this.interval);
      }
    },
    nextStep() {
      if (this.currStep <= this.steps.length) {
        this.$store.commit(this.steps[this.currStep].mutation, this.steps[this.currStep].payload);
        this.increaseStep();
      }
    },
    prevStep() {
      if (this.currStep > 0) {
        this.resetMutations();
        for (let i = 0; i < this.currStep - 1; i++) {
          this.$store.commit(this.steps[i].mutation, this.steps[i].payload);
        }
        this.decreaseStep();
      }
    },
    firstStep() {
      this.resetMutations();
      this.minStep();
    },
    lastStep() {
      for (let i = 0; i < this.steps.length; i++) {
        this.$store.commit(this.steps[i].mutation, this.steps[i].payload);
      }
      this.maxStep(this.steps.length);
    },
    jumpStep() {
      this.resetMutations();
      for (let i = 0; i < this.currStep; i++) {
        this.$store.commit(this.steps[i].mutation, this.steps[i].payload);
      }
    },
    ...mapMutations(['increaseStep', 'decreaseStep', 'minStep', 'maxStep', 'setStep', 'resetMutations'])
  },
  computed: {
    currentStep: {
      get() {
        return this.currStep;
      },
      set(value) {
        this.setStep(value);
      }
    },
    ...mapState(['currStep']),
    ...mapGetters({ steps: 'bubbleSort' })
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
  box-shadow: -20vw 0 0 20vw #ff4587;
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
