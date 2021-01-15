function bubbleSort(state) {
  let cardsCopy = JSON.parse(JSON.stringify(state.cards)).slice(0, state.size);
  let n = state.size;
  let swapped;

  state.steps.push({
    codeBlock: 'block1',
    explanation: 'Set n to array length\nEnter the do while loop'
  });

  do {
    swapped = false;

    state.steps.push({
      codeBlock: 'block2',
      explanation: 'Iterate through the unsorted values\nSet swapped flag to false'
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
    explanation: `As no swaps occured, break out of the loop\nAll the cards are now sorted`
  });
}

function selectionSort(state) {
  let cardsCopy = JSON.parse(JSON.stringify(state.cards)).slice(0, state.size);
  let n = state.size;

  state.steps.push({
    codeBlock: 'block1',
    explanation: 'Iterate over the entire array\nSet minIndex to the first unsorted index'
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
        explanation: `Comparing the values ${cardsCopy[min].value} and ${cardsCopy[j].value}\nIf compared value is smaller, set new minIndex`
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
          { index: state.size - 1, color: i == n - 2 ? 'green' : '' }
        ],
        codeBlock: 'block5',
        explanation: `Swapping ${cardsCopy[i].value} and ${cardsCopy[min].value}\nElement is now sorted in the subarray`
      });

      let tmp = cardsCopy[i];
      cardsCopy[i] = cardsCopy[min];
      cardsCopy[min] = tmp;
    } else {
      state.steps.push({
        mutation: 'highlight',
        payload: [
          { index: i, color: 'green' },
          { index: state.size - 1, color: i == n - 2 ? 'green' : '' }
        ],
        codeBlock: 'block5',
        explanation: `Current element in minIndex is the smallest\nElement already in correct subarray position`
      });
    }
  }
  state.steps.push({
    explanation: 'No more elements in the unsorted subarray\nSelection Sort is now finished'
  });
  return cardsCopy;
}

function insertionSort(state) {
  let cardsCopy = JSON.parse(JSON.stringify(state.cards)).slice(0, state.size);
  let n = state.size;

  state.steps.push({
    mutation: 'highlight',
    payload: [{ index: 0, color: 'green' }],
    codeBlock: 'block1',
    explanation: 'Start iterating from the second element\nElement at index 0 starts in the sorted subarray'
  });

  for (let i = 1; i < n; i++) {
    let current = cardsCopy[i];
    let j = i;

    state.steps.push({
      mutation: 'highlight',
      payload: [{ index: i, color: 'purple' }],
      codeBlock: 'block2',
      explanation: `Set current to the first unsorted element (${cardsCopy[i].value})\nSet j as the index of the current element (${j})`
    });

    do {
      state.steps.push({
        mutation: 'highlight',
        payload: [{ index: j - 1, color: 'yellow' }],
        codeBlock: 'block3',
        explanation: `Find index j within subset for current element\nComparing values of ${current.value} and ${
          cardsCopy[j - 1].value
        }`
      });

      if (j > 0 && current.value < cardsCopy[j - 1].value) {
        state.steps.push({
          mutation: 'swap',
          payload: [
            { index: j, color: 'green' },
            { index: j - 1, color: 'purple' }
          ],
          codeBlock: 'block4',
          explanation: `${current.value} is smaller, shift ${cardsCopy[j].value} to the right\nDecrease index j by one`
        });

        cardsCopy[j] = cardsCopy[j - 1];
        j--;
      }
    } while (j > 0 && current.value < cardsCopy[j - 1].value);

    cardsCopy[j] = current;

    state.steps.push({
      mutation: 'highlight',
      payload: [{ index: j, color: 'green' }, ...(j > 0 ? [{ index: j - 1, color: 'green' }] : [])],
      codeBlock: 'block5',
      explanation: 'Current is now sorted in the subarray\nIt can now be inserted at inserted at index j'
    });
  }
  state.steps.push({
    explanation: 'The unsorted subarray is empty\nAll the cards have been sorted'
  });
}

export { bubbleSort, selectionSort, insertionSort };
