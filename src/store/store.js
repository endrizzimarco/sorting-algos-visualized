import { createStore } from 'vuex';

const store = createStore({
  state: {
    algorithm: 'bubbleSort',
    numbers: [
      { id: 0, value: 5 },
      { id: 1, value: 4 },
      { id: 2, value: 3 },
      { id: 3, value: 2 },
      { id: 4, value: 1 }
    ],
    size: 5,
    speed: 'Average',
    options: {
      algorithms: ['Bubble Sort', 'Bogus Sort', 'Hamlalaa'],
      sizes: [4, 5, 6, 7, 8],
      speeds: ['Slow', 'Average', 'Fast']
    },
    mutations: {
      commitChanges(algorithm, size, speed) {
        this.algorithm = algorithm;
        this.size = size;
        this.speed = speed;
      }
    }
  }
});

export default store;
