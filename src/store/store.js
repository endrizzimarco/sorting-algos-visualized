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
    currStep: 0,
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
    generateNumbers(state) {
      state.numbers = [];
      state.numbersSnapshot = [];
      for (let i = 0; i < 8; i++) {
        let cell = {
          id: i,
          value: Math.floor(Math.random() * 100),
          color: 'bg-red-300'
        };
        state.numbers.push(cell);
        state.numbersSnapshot.push(cell);
      }
      this.commit('resetVisualizer');
    },
    // Reset the visualizer to initial state
    resetVisualizer(state) {
      state.currStep = 0;
      this.commit('undoMutations');
      this.commit('bubbleSort');
    },
    // Change settings for visualization and reset to beginning
    changeOptions(state, payload) {
      state.algo = payload.algo;
      state.size = payload.size;
      state.speed = payload.speed;
      this.commit('resetVisualizer');
    },
    /* 
      ********************************
        CONTROL VISUALIZATION STEPS
      ********************************
    */
    increaseStep: state => state.currStep++,
    decreaseStep: state => state.currStep--,
    setStep: (state, payload) => (state.currStep = payload),
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
      state.steps = [];
      let arrayCopy = JSON.parse(JSON.stringify(state.numbers)).slice(0, state.size);
      let n = state.size;
      let swapped;
      do {
        swapped = false;
        state.steps.push({ mutation: 'pass', codeBlock: 'block2' });
        for (let i = 1; i < n; i++) {
          state.steps.push({ mutation: 'compare', payload: [i - 1, i, i - 2], codeBlock: 'block3' });
          if (arrayCopy[i - 1].value > arrayCopy[i].value) {
            let temp = arrayCopy[i - 1];
            arrayCopy[i - 1] = arrayCopy[i];
            arrayCopy[i] = temp;
            state.steps.push({ mutation: 'swap', payload: [i - 1, i], codeBlock: 'block4' });
            swapped = true;
          }
        }
        state.steps.push({ mutation: 'done', payload: [n - 1, n - 2], codeBlock: 'block5' });
        n -= 1;
      } while (swapped);
      while (n) {
        state.steps.push({ mutation: 'done', payload: [n - 1, n - 2], codeBlock: 'block5' });
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
