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
      block5: '  n = n - 1\nwhile swapped'
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
    code: {
      block1: 'for i=0 to length(array)-1\n minIndex = i',
      block2: '  for j=i+1 to length(array)',
      block3: '    if currentElement < min',
      block4: '      minIndex = currentElementIndex',
      block5: '  if minIndex != i\n    swap(min, firstUnsorted)'
    }
  },
  'Insertion Sort': {
    complexities: {
      timeBest: 'Ω(n)',
      timeAverage: 'Θ(n^2)',
      timeWorst: 'O(n^2)',
      spaceWorst: 'O(1)'
    },
    wikipedia: 'https://en.wikipedia.org/wiki/Insertion_sort',
    text: `Insertion sort is stable, in-place sorting algorithm that builds the final sorted array one item at a time.
          In the real world, the data to be sorted is usually not static, but rather dynamic. Insertion Sort can therefore come in
          handy as a well known online algorithm, which can sort a list as it receives it. 
          It allows us to start with apartial set of elements, and after sorting it, have the ability to insert and sort more elements
          that were not in memory when the sorting started.`,
    code: {
      block1: 'for i=1 to length(array)',
      block2: '  current = firstUnsorted\n  j = currentIndex',
      block3: '  while j > 0 and current < leftElement',
      block4: '      shift(leftElement)\n      j = j - 1',
      block5: '  element[j] = current'
    }
  },
  Quicksort: {
    complexities: {
      timeBest: 'Ω(n log(n))',
      timeAverage: 'Θ(n log(n))',
      timeWorst: 'O(n^2)',
      spaceWorst: 'O(log(n))'
    },
    wikipedia: 'https://en.wikipedia.org/wiki/Quicksort',
    text: `Quicksort is an efficient in-place sorting algorithm, still commonly used today, which usually performs about 
          two to three times faster than merge sort when implemented well. Quicksort is a comparison sort, meaning that 
          it can sort items of any type for which a less than relation is defined. In efficient implementations, it is usually
          not a stable sort. Quicksort is also a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array
          and partitioning the other elements into two sub-arrays which are then sorted recursevely.`,
    code: {
      block1: 'for each partition:\n  pivot = rightmostElement',
      block2: '  pIndex = leftmostIndex',
      block3: '  for i in length(partition):\n    if element[i] < pivot:',
      block4: '      swap(element[i], element[pIndex])\n      pIndex++',
      block5: '  swap(pivot, element[pIndex])'
    }
  }
};
