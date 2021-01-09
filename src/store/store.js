import { createStore } from 'vuex';
import algoData from './algoData.js';
import { bubbleSort } from './algoImplementation.js';

const store = createStore({
  state: {
    algorithm: 'Bubble Sort',
    size: 5,
    numbers: [],
    numbersSnapshot: [],
    speed: 'Average',
    steps: [],
    stepIndex: 0,
    interval: null,
    options: {
      algorithms: ['Bubble Sort', 'Selection Sort', 'Insertion Sort'],
      sizes: [4, 5, 6, 7, 8],
      speeds: ['Slow', 'Average', 'Fast']
    },
    algoData: algoData
  },

  mutations: {
    /* 
    *******************************
      CONTROL VISUALIZATION DATA
    *******************************
    */
    // Generate array for visualization
    generateNumbers(state, payload) {
      state.numbers = [];
      state.numbersSnapshot = [];
      function validRange(x) {
        return x >= 0 && x <= 13;
      }

      for (let i = 0; i < 8; i++) {
        let cell = {
          id: i,
          value: payload[i] && validRange(payload[i]) ? payload[i] : Math.ceil(Math.random() * 13),
          color: 'bg-opacity-0'
        };
        state.numbers.push(cell);
        state.numbersSnapshot.push(cell);
      }
      this.commit('resetVisualizer');
    },
    // Reset the visualizer to initial state
    resetVisualizer(state) {
      state.stepIndex = 0;
      state.steps = [];
      this.commit('clearInterval');
      this.commit('undoMutations');
      this.commit('bubbleSort');
    },
    // Change settings for visualization and reset to beginning
    changeOptions(state, payload) {
      state.algorithm = payload.algo;
      state.size = payload.size;
      state.speed = payload.speed;

      this.commit('generateNumbers', payload.numbers);
      this.commit('resetVisualizer');
    },
    setInterval(state, payload) {
      var playSpeed = 1000;

      if (state.speed == 'Slow') {
        playSpeed = 2000;
      } else if (state.speed == 'Fast') {
        playSpeed = 500;
      }
      state.interval = setInterval(payload, playSpeed);
    },
    clearInterval: state => clearInterval(state.interval),
    /* 
      ********************************
        CONTROL VISUALIZATION STEPS
      ********************************
    */
    increaseStep: state => state.stepIndex++,
    decreaseStep: state => state.stepIndex--,
    setStep: (state, payload) => (state.stepIndex = payload),
    // Restore numbers to original set
    undoMutations(state) {
      let originalCopy = JSON.parse(JSON.stringify(state.numbersSnapshot));
      state.numbers = originalCopy;
    },
    /* 
    ************************************
      ALGORITHMS STEPS IMPLEMENTATION
    ************************************
    */
    // Swap two numbers in array based on payload indexes
    swap(state, payload) {
      let temp = state.numbers[payload[1]];
      state.numbers[payload[1]] = state.numbers[payload[0]];
      state.numbers[payload[0]] = temp;
      state.numbers[payload[0]].color = state.numbers[payload[1]].color = 'bg-opacity-0';
    },
    // Set yellow backgrounds of array items based on indexes
    compare(state, payload) {
      if (state.numbers[payload[2]]) {
        state.numbers[payload[2]].color = 'bg-opacity-0';
      }
      state.numbers[payload[0]].color = state.numbers[payload[1]].color = 'bg-yellow-200 bg-opacity-80';
    },
    done(state, payload) {
      state.numbers[payload[0]].color = 'bg-green-300 bg-opacity-80';
      if (state.numbers[payload[1]]) {
        state.numbers[payload[1]].color = 'bg-opacity-0';
      }
    },
    pass: () => 0,
    /* 
    *****************************************************
      ALGORITHMS IMPLEMENTATION ./algoImplementation.js
    *****************************************************
    */
    bubbleSort: state => bubbleSort(state)
  },

  getters: {
    // Show array based on size
    slicedArray: state => state.numbers.slice(0, state.size),
    // Return data for current algorithm
    currAlgoData: state => state.algoData[state.algorithm]
  }
});

export default store;
