export default {
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
    code: {
      block1: 'n = length(array)\ndo',
      block2: '  swapped = false\n  for i=1 to n-1:',
      block3: '    if leftElement > rightElement',
      block4: '      swap(leftElement, rightElement)\n      swapped = true',
      block5: '  n = n-1\nwhile swapped'
    }
  },
  'Selection Sort': {
    complexities: {
      timeBest: 'Ω(n^2)',
      timeAverage: 'Θ(n^2)',
      timeWorst: 'O(n^2)',
      spaceWorst: 'O(1)'
    },
    wikipedia: 'https://en.wikipedia.org/wiki/Selection_sort',
    text: `Selection sort is an unstable, in-place sorting algorithm known for its simplicity.
          The biggest advantage of using selection sort is that we only requires maximumn swaps (memory write)
          where n is the length of the input. This can be very important if memory write operation is significantly
          more expensive than memory read operation, such as with Flash memory, where every write lessens the lifespan of the memory. `,
    code: {}
  }
};
