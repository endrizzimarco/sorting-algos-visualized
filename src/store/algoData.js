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
};
