import { createStore } from 'vuex';

function generateNumbers() {
  var numbers = [];
  for (let i = 0; i < 8; i++) {
    numbers.push({ id: i, value: Math.floor(Math.random() * 100) });
  }
  return numbers;
}

const store = createStore({
  state: {
    algorithm: 'Bubble Sort',
    size: 5,
    numbers: generateNumbers(),
    speed: 'Average',
    options: {
      algorithms: ['Bubble Sort', 'Bogus Sort', 'Hamlalaa'],
      sizes: [4, 5, 6, 7, 8],
      speeds: ['Slow', 'Average', 'Fast']
    }
  },
  mutations: {
    changeOptions(state, payload) {
      state.algo = payload.algo;
      state.size = payload.size;
      state.speed = payload.speed;
    },
    shuffle(state) {
      state.numbers = generateNumbers();
    },
    test(state) {
      let temp = state.numbers[1];
      state.numbers[1] = state.numbers[0];
      state.numbers[0] = temp;
    }
  },
  getters: {
    slicedArray: state => state.numbers.slice(0, state.size)
  }
});

export default store;
