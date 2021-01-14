import { createStore } from 'vuex';
import algoData from './algoData.js';
import { bubbleSort, selectionSort } from './algoImplementation.js';

const store = createStore({
  state: {
    algorithm: 'Bubble Sort',
    size: 5,
    cards: [],
    cardsSnapshot: [],
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
    generateCards(state, payload) {
      state.cards = [];
      state.cardsSnapshot = [];
      function validRange(x) {
        return x >= 0 && x <= 13;
      }

      for (let i = 0; i < 8; i++) {
        let cell = {
          id: i,
          value: payload[i] && validRange(payload[i]) ? payload[i] : Math.ceil(Math.random() * 13),
          color: 'bg-opacity-0'
        };
        state.cards.push(cell);
        state.cardsSnapshot.push(cell);
      }
      this.commit('resetVisualizer');
    },
    // Reset the visualizer to initial state
    resetVisualizer(state) {
      state.stepIndex = 0;
      state.steps = [];
      this.commit('clearInterval');
      this.commit('undoMutations');

      function camelize(str) {
        return str
          .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
          })
          .replace(/\s+/g, '');
      }
      this.commit(camelize(state.algorithm));
    },
    // Change settings for visualization and reset to beginning
    changeOptions(state, payload) {
      state.algorithm = payload.algo;
      state.size = payload.size;
      state.speed = payload.speed;

      this.commit('generateCards', payload.numbers);
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
    // Restore cards to original set
    undoMutations(state) {
      let originalCopy = JSON.parse(JSON.stringify(state.cardsSnapshot));
      state.cards = originalCopy;
    },
    /* 
    ************************************
      ALGORITHMS STEPS IMPLEMENTATION
    ************************************
    */
    // Swap two cards in array based on payload indexes
    highlight(state, payload) {
      for (let i = 0; i < payload.length; i++) {
        let cardIndex = payload[i].index;
        let card = state.cards[cardIndex];

        switch (payload[i].color) {
          case 'green':
            card.color = 'bg-green-300 bg-opacity-80';
            break;
          case 'yellow':
            card.color = 'bg-yellow-200 bg-opacity-80';
            break;
          case 'purple':
            card.color = 'bg-purple-300 bg-opacity-80';
            break;
          default:
            card.color = 'bg-opacity-0';
        }
      }
    },
    swap(state, payload) {
      let card1 = payload[0].index;
      let card2 = payload[1].index;

      let temp = state.cards[card2];
      state.cards[card2] = state.cards[card1];
      state.cards[card1] = temp;

      this.commit('highlight', payload);
    },
    /* 
    *****************************************************
      ALGORITHMS IMPLEMENTATION ./algoImplementation.js
    *****************************************************
    */
    bubbleSort: state => bubbleSort(state),
    selectionSort: state => selectionSort(state)
  },

  getters: {
    // Show array based on size
    currCards: state => state.cards.slice(0, state.size),
    // Return data for current algorithm
    currAlgoData: state => state.algoData[state.algorithm]
  }
});

export default store;
