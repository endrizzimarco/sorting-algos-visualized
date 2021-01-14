function bubbleSort(state) {
  let arrayCopy = JSON.parse(JSON.stringify(state.numbers)).slice(0, state.size);
  let n = state.size;
  let swapped;
  do {
    swapped = false;
    state.steps.push({
      codeBlock: 'block2',
      explanation: 'Pass through the unsorted values\nSet swapped flag to false'
    });
    for (let i = 1; i < n; i++) {
      state.steps.push({
        mutation: 'highlight',
        payload: [
          { index: i - 1, color: 'yellow' },
          { index: i, color: 'yellow' },
          ...(i > 1 ? [{ index: i - 2, color: '' }] : [])
        ],
        codeBlock: 'block3',
        explanation: `Comparing the values ${arrayCopy[i - 1].value} and ${
          arrayCopy[i].value
        }\nIf the first value is bigger, swap them`
      });
      if (arrayCopy[i - 1].value > arrayCopy[i].value) {
        state.steps.push({
          mutation: 'swap',
          payload: [
            { index: i - 1, color: '' },
            { index: i, color: arrayCopy[i - 1].value == arrayCopy[i].value ? 'green' : '' }
          ],
          codeBlock: `block4`,
          explanation: `Swapping ${arrayCopy[i - 1].value} and ${arrayCopy[i].value}\nSet swapped flag to true`
        });
        let temp = arrayCopy[i - 1];
        arrayCopy[i - 1] = arrayCopy[i];
        arrayCopy[i] = temp;
        swapped = true;
      }
    }
    if (swapped) {
      state.steps.push({
        mutation: 'highlight',
        payload: [
          { index: n - 1, color: 'green' },
          { index: n - 2, color: '' }
        ],
        codeBlock: 'block5',
        explanation:
          arrayCopy[n - 1].value +
          ' "bubbled" to the top and is now sorted\nAs a swap occurred, start from the beginning'
      });
    }
    n -= 1;
  } while (swapped);

  let alreadySorted = [];
  while (n + 1) {
    alreadySorted.push({ index: n, color: 'green' });
    n--;
  }
  console.log(alreadySorted);
  state.steps.push({
    mutation: 'highlight',
    payload: alreadySorted,
    codeBlock: 'block5',
    explanation: `As no swaps occured, bubble sort is finished\nAll numbers are now sorted`
  });
}

function selectionSort(state) {
  let arrayCopy = JSON.parse(JSON.stringify(state.numbers)).slice(0, state.size);
  let n = state.size;
  state.steps.push({
    mutation: 'pass',
    codeBlock: 'block1',
    explanation: 'Entering first for loop\nSkip first card as it is already sorted'
  });
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    state.steps.push({
      mutation: 'current',
      codeBlock: 'block2',
      payload: [min],
      explanation: `Find the min element in unsorted subarray\nCurrent minIndex = ${i}`
    });
    for (let j = i + 1; j < n; j++) {
      let resetColor = min == j - 1 ? '' : j - 1;
      state.steps.push({
        mutation: 'compare',
        codeBlock: 'block3',
        payload: [j, '', resetColor],
        explanation: `Comparing the values ${arrayCopy[min].value} and ${arrayCopy[j].value}\nIf current value is smaller, set new minIndex`
      });
      if (arrayCopy[j].value < arrayCopy[min].value) {
        state.steps.push({
          mutation: 'hack',
          codeBlock: 'block4',
          payload: [min, j],
          explanation: `${arrayCopy[j].value} is smaller than  ${arrayCopy[min].value}\nNew minIndex = ${arrayCopy[j].id}`
        });
        min = j;
      }
    }
    if (min != i) {
      state.steps.push({
        mutation: 'swap',
        codeBlock: 'block5',
        payload: [i, min, i],
        explanation: 'Swapping ${arrayCopy[j].value} and ${arrayCopy[min].value}\nNew minIndex = ${arrayCopy[j].id}'
      });
      let tmp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[min];
      arrayCopy[min] = tmp;
    }
  }
  state.steps.push({
    mutation: 'pass',
    explanation: 'Finished\nWith insertion sort'
  });
  return arrayCopy;
}

export { bubbleSort, selectionSort };
