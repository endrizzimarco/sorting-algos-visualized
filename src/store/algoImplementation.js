function bubbleSort(state) {
  let cardsCopy = JSON.parse(JSON.stringify(state.cards)).slice(0, state.size);
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
        explanation: `Comparing the values ${cardsCopy[i - 1].value} and ${
          cardsCopy[i].value
        }\nIf the first value is bigger, swap them`
      });
      if (cardsCopy[i - 1].value > cardsCopy[i].value) {
        state.steps.push({
          mutation: 'swap',
          payload: [
            { index: i - 1, color: '' },
            { index: i, color: cardsCopy[i - 1].value == cardsCopy[i].value ? 'green' : '' }
          ],
          codeBlock: `block4`,
          explanation: `Swapping ${cardsCopy[i - 1].value} and ${cardsCopy[i].value}\nSet swapped flag to true`
        });
        let temp = cardsCopy[i - 1];
        cardsCopy[i - 1] = cardsCopy[i];
        cardsCopy[i] = temp;
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
          cardsCopy[n - 1].value +
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
  state.steps.push({
    mutation: 'highlight',
    payload: alreadySorted,
    codeBlock: 'block5',
    explanation: `As no swaps occured, bubble sort is finished\nAll cards are now sorted`
  });
}

function selectionSort(state) {
  let cardsCopy = JSON.parse(JSON.stringify(state.cards)).slice(0, state.size);
  let n = state.size;
  state.steps.push({
    codeBlock: 'block1',
    explanation: 'Entering first for loop\nSkip first card as it is already sorted'
  });
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    state.steps.push({
      mutation: 'highlight',
      payload: [{ index: min, color: 'purple' }],
      codeBlock: 'block2',
      explanation: `Find the min element in unsorted subarray\nCurrent minIndex = ${i}`
    });
    for (let j = i + 1; j < n; j++) {
      state.steps.push({
        mutation: 'highlight',
        payload: [{ index: j, color: 'yellow' }, ...(j > 1 && j - 1 != min ? [{ index: j - 1, color: '' }] : [])],
        codeBlock: 'block3',
        explanation: `Comparing the values ${cardsCopy[min].value} and ${cardsCopy[j].value}\nIf current value is smaller, set new minIndex`
      });
      if (cardsCopy[j].value < cardsCopy[min].value) {
        state.steps.push({
          mutation: 'highlight',
          payload: [
            { index: min, color: '' },
            { index: j, color: 'purple' }
          ],
          codeBlock: 'block4',
          explanation: `${cardsCopy[j].value} is smaller than ${cardsCopy[min].value}\nNew minIndex = ${cardsCopy[j].id}`
        });
        min = j;
      }
    }

    if (min != i) {
      state.steps.push({
        mutation: 'swap',
        payload: [
          { index: i, color: 'green' },
          { index: min, color: '' },
          { index: state.size - 1, color: state.size - 1 == min ? 'green' : '' }
        ],
        codeBlock: 'block5',
        explanation: 'Swapping ${cardsCopy[j].value} and ${cardsCopy[min].value}\nNew minIndex = ${cardsCopy[j].id}'
      });
      let tmp = cardsCopy[i];
      cardsCopy[i] = cardsCopy[min];
      cardsCopy[min] = tmp;
    } else {
      state.steps.push({
        mutation: 'highlight',
        payload: [
          { index: i, color: 'green' },
          { index: state.size - 1, color: state.size - 1 == min + 1 ? 'green' : '' }
        ],
        codeBlock: 'block5',
        explanation: 'CHANGE THIS correct position\nNew minIndex = ${cardsCopy[j].id}'
      });
    }
  }
  state.steps.push({
    explanation: 'Insertion sort is finished\nAll the cards are now sorted'
  });
  return cardsCopy;
}

export { bubbleSort, selectionSort };
