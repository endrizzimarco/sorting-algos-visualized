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
    algoDetails: {
      'Bubble Sort': {
        complexities: {
          timeBest: 'Ω(n)',
          timeAverage: 'Θ(n^2)',
          timeWorst: 'O(n^2)',
          spaceWorst: 'O(1)'
        },
        wikipedia: 'https://en.wikipedia.org/wiki/Bubble_sort',
        text: `Bubble Sort is a stable, in-place sorting algorithm that is named for the way
              smaller or larger elements "bubble" to the top of the list. Altough the algorithm is simple,
              it is too slow and impractical for most problems even when compared to insertion sort and is not
              recommended when n is large. The only significant advantage that bubble sort has over most other 
              implementations, even quicksort, but not insertion sort, is the ability to detect if the list is already sorted.`,
        implementation: {
          block1: {
            code: 'n = length(input)\ndo',
            explanation: 'HOLY FUCK DUDE'
          },
          block2: {
            code: '  swapped = false\n  for i=1 to n-1:',
            explanation: 'this is block 2(pog)'
          },
          block3: {
            code: '    if leftElement > rightElement',
            explanation: 'we are possibly comparing stuff'
          },
          block4: {
            code: '      swap(leftElement, rightElement)\n      swapped = true',
            explanation: 'we do be swapping'
          },
          block5: {
            code: '  n = n-1\nwhile swapped',
            explanation: 'this is the end'
          }
        }
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
    },
    pass() {}
  },
  getters: {
    slicedArray: state => state.numbers.slice(0, state.size),
    currAlgoDetails: state => state.algoDetails[state.algorithm],
    bubbleSort(state) {
      let arrayCopy = state.numbers.slice(0, state.size);
      let n = state.size;
      let swapped;
      let steps = [];
      do {
        swapped = false;
        steps.push({ animation: 'pass', highlight: ['line3', 'line4'] });
        for (let i = 1; i < n; i++) {
          steps.push({ animation: 'compare', params: [i - 1, i, i - 2], highlight: ['line5'] });
          if (arrayCopy[i - 1].value > arrayCopy[i].value) {
            let temp = arrayCopy[i - 1];
            arrayCopy[i - 1] = arrayCopy[i];
            arrayCopy[i] = temp;
            steps.push({ animation: 'swap', params: [i - 1, i], highlight: ['line6', 'line7'] });
            swapped = true;
          }
        }
        steps.push({ animation: 'done', params: [n - 1, n - 2] });
        n -= 1;
      } while (swapped);
      while (n) {
        steps.push({ animation: 'done', params: [n - 1, n - 2] });
        n--;
      }
      return steps;
    }
  }
});

export default store;
