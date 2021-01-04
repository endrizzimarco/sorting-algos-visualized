import { createStore } from 'vuex';

function generateNumbers() {
  var numbers = [];
  for (let i = 0; i < 8; i++) {
    numbers.push({
      id: i,
      value: Math.floor(Math.random() * 100),
      color: 'bg-red-300'
    });
  }
  return numbers;
}

let initialState = generateNumbers();
let originalState = JSON.parse(JSON.stringify(initialState));

const store = createStore({
  state: {
    algorithm: 'Bubble Sort',
    size: 5,
    numbers: initialState,
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
          'Bubble Sort is a stable, in-place sorting algorithm that is named for the way smaller or larger elements "bubble" to the top of the list. Altough the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort and is not recommended when n is large. The only significant advantage that bubble sort has over most other implementations, even quicksort, but not insertion sort, is the ability to detect if the list is already sorted.'
      }
    },
    algoCode: {
      'Bubble Sort': {
        line1: 'n = length(input)',
        line2: 'do',
        line3: '  swapped = false',
        line4: '  for i=1 to n-1:',
        line5: '    if leftElement > rightElement',
        line6: '      swap(leftElement, rightElement)',
        line7: '      swapped = true',
        line8: '  n = n-1',
        line9: 'while swapped'
      }
    }
  },
  mutations: {
    changeOptions(state, payload) {
      state.algo = payload.algo;
      state.size = payload.size;
      state.speed = payload.speed;
    },
    // Restore numbers to original set
    restoreNumbers(state) {
      let originalCopy = JSON.parse(JSON.stringify(originalState));
      state.numbers = originalCopy;
    },
    // Randomly generate a new set of numbers
    shuffle(state) {
      state.numbers = generateNumbers();
      originalState = JSON.parse(JSON.stringify(state.numbers));
    },
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
    }
  },
  getters: {
    slicedArray: state => state.numbers.slice(0, state.size),
    currentInfo: state => state.algoInfo[state.algorithm],
    currentCode: state => state.algoCode[state.algorithm],
    bubbleSort(state) {
      let arrayCopy = state.numbers.slice(0, state.size);
      let n = state.size;
      let swapped;
      let steps = [];
      do {
        swapped = false;
        for (let i = 1; i < n; i++) {
          steps.push({ type: 'compare', params: [i - 1, i, i - 2] });
          if (arrayCopy[i - 1].value > arrayCopy[i].value) {
            let temp = arrayCopy[i - 1];
            arrayCopy[i - 1] = arrayCopy[i];
            arrayCopy[i] = temp;
            steps.push({ type: 'swap', params: [i - 1, i] });
            swapped = true;
          }
        }
        steps.push({ type: 'done', params: [n - 1, n - 2] });
        n -= 1;
      } while (swapped);
      while (n) {
        steps.push({ type: 'done', params: [n - 1, n - 2] });
        n--;
      }
      return steps;
    }
  }
});

export default store;
