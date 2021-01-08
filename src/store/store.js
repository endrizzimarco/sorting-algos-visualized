import { createStore } from 'vuex';
import algoData from './algoData.js';

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
      algorithms: ['Bubble Sort', 'Bogus Sort', 'Hamlalaa'],
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

      for (let i = 0; i < 8; i++) {
        let cell = {
          id: i,
          value: payload[i] ? payload[i] : Math.floor(Math.random() * 100),
          color: 'bg-red-300'
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
      state.algo = payload.algo;
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
      state.numbers[payload[0]].color = state.numbers[payload[1]].color = 'bg-red-300';
    },
    // Set yellow backgrounds of array items based on indexes
    compare(state, payload) {
      if (state.numbers[payload[2]]) {
        state.numbers[payload[2]].color = 'bg-red-300';
      }
      state.numbers[payload[0]].color = state.numbers[payload[1]].color = 'bg-yellow-300';
    },
    done(state, payload) {
      state.numbers[payload[0]].color = 'bg-green-300';
      if (state.numbers[payload[1]]) {
        state.numbers[payload[1]].color = 'bg-red-300';
      }
    },
    pass: () => 0,
    //TODO: Put this in another file
    bubbleSort(state) {
      let arrayCopy = JSON.parse(JSON.stringify(state.numbers)).slice(0, state.size);
      let n = state.size;
      let swapped;
      do {
        swapped = false;
        state.steps.push({
          mutation: 'pass',
          codeBlock: 'block2',
          explanation: 'Entering for loop\nSet swapped flag to false'
        });
        for (let i = 1; i < n; i++) {
          state.steps.push({
            mutation: 'compare',
            payload: [i - 1, i, i - 2],
            codeBlock: 'block3',
            explanation: `Comparing the values ${arrayCopy[i - 1].value} and ${
              arrayCopy[i].value
            }\nIf the first value is bigger, swap them`
          });
          if (arrayCopy[i - 1].value > arrayCopy[i].value) {
            state.steps.push({
              mutation: 'swap',
              payload: [i - 1, i],
              codeBlock: `block4`,
              explanation: `Swapping ${arrayCopy[i - 1].value} and ${arrayCopy[i].value}\nSet swapped flag to true`
            });
            let temp = arrayCopy[i - 1];
            arrayCopy[i - 1] = arrayCopy[i];
            arrayCopy[i] = temp;
            swapped = true;
          }
        }
        state.steps.push({
          mutation: 'done',
          payload: [n - 1, n - 2],
          codeBlock: 'block5',
          explanation: `${arrayCopy[n - 1].value} is sorted\nAs swap flag is set to true, loop again`
        });
        n -= 1;
      } while (swapped);
      while (n) {
        state.steps.push({
          mutation: 'done',
          payload: [n - 1, n - 2],
          codeBlock: 'block5',
          explanation:
            n > 1
              ? `${arrayCopy[n - 1].value} is sorted\nAs swap flag is set to true, loop again`
              : `As swap flag is set to false, end while loop\nBubble sort is now completed`
        });
        n--;
      }
    }
  },
  getters: {
    // Show array based on size
    slicedArray: state => state.numbers.slice(0, state.size),
    // Return data for current algorithm
    currAlgoData: state => state.algoData[state.algorithm]
  }
});

export default store;
