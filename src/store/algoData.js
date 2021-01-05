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
      block1: 'n = length(input)\ndo',
      block2: '  swapped = false\n  for i=1 to n-1:',
      block3: '    if leftElement > rightElement',
      block4: '      swap(leftElement, rightElement)\n      swapped = true',
      block5: '  n = n-1\nwhile swapped'
    }
  }
};
