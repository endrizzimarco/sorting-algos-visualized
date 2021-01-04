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
    input(type='range', min='0', :max='allSteps.length', v-model='currStep', @change='jumpStep') 
</template>

<script>
export default {
  data() {
    return {
      playing: false,
      interval: '',
      currStep: 0,
      allSteps: this.$store.getters.bubbleSort
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
      if (this.currStep <= this.allSteps.length) {
        this.$store.commit(this.allSteps[this.currStep].type, this.allSteps[this.currStep].params);
        this.currStep++;
      }
    },
    prevStep() {
      if (this.currStep > 0) {
        this.$store.commit('restoreNumbers');
        for (let i = 0; i < this.currStep - 1; i++) {
          this.$store.commit(this.allSteps[i].type, this.allSteps[i].params);
        }
        this.currStep--;
      }
    },
    firstStep() {
      this.$store.commit('restoreNumbers');
      this.currStep = 0;
    },
    lastStep() {
      for (let i = 0; i < this.allSteps.length; i++) {
        this.$store.commit(this.allSteps[i].type, this.allSteps[i].params);
      }
      this.currStep = this.allSteps.length;
    },
    jumpStep() {
      this.$store.commit('restoreNumbers');
      for (let i = 0; i < this.currStep; i++) {
        this.$store.commit(this.allSteps[i].type, this.allSteps[i].params);
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
