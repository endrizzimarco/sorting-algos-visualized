<template lang="pug">
.flex.items-center.max-w-2xl.h-9.mx-auto.mt-6.bg-light-navy.rounded
  img.h-6.mx-1.ml-3.cursor-pointer(src='@/assets/fast-back.png')
  img.h-6.mx-1.cursor-pointer(src='@/assets/back.png')
  img.h-6.mx-1.cursor-pointer(
    @click='playing = !playing',
    :src='playing ? require("@/assets/pause.png") : require("@/assets/play.png")'
  )
  img.h-6.mx-1.cursor-pointer(src='@/assets/forward.png')
  img.h-6.mx-1.cursor-pointer(src='@/assets/fast-forward.png')
  img.h-6.mx-1.cursor-pointer(src='@/assets/fast-forward.png')
  .w-full
    input(type='range', min='1', max='1000', value='1')
</template>

<script>
export default {
  data() {
    return {
      playing: false
    };
  }
};
</script>

<style>
input[type='range'] {
  -webkit-appearance: none;
  overflow: hidden;
  width: 80%;
  outline: none;
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
