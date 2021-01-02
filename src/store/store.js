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
    },
    algoInfo: {
      'Bubble Sort': {
        complexities: {
          timeBest: 'Ω(n)',
          timeAverage: 'Θ(n^2)',
          timeWorst: 'O(n^2)',
          spaceWorst: 'O(1)'
        },
        wikipedia: 'https://en.wikipedia.org/wiki/Bubble_sort',
        text:
          'Bubble Sort is a stable, in-place sorting algorithm that is named for the way smaller or larger elements "bubble" to the top of the list. \n Altough the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort and is not recommended when n is large. The only significant advantage that bubble sort has over most other implementations, even quicksort, but not insertion sort, is the ability to detect if the list is already sorted.'
      }
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
    slicedArray: state => state.numbers.slice(0, state.size),
    currentInfo: state => state.algoInfo[state.algorithm]
  }
});

export default store;
