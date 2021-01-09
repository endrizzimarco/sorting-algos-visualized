export function bubbleSort(state) {
  let arrayCopy = JSON.parse(JSON.stringify(state.numbers)).slice(0, state.size);
  let n = state.size;
  let swapped;
  do {
    swapped = false;
    state.steps.push({
      mutation: 'pass',
      codeBlock: 'block2',
      explanation: 'Entering for loop\nSet swapped flag to false'
    });
    for (let i = 1; i < n; i++) {
      state.steps.push({
        mutation: 'compare',
        payload: [i - 1, i, i - 2],
        codeBlock: 'block3',
        explanation: `Comparing the values ${arrayCopy[i - 1].value} and ${
          arrayCopy[i].value
        }\nIf the first value is bigger, swap them`
      });
      if (arrayCopy[i - 1].value > arrayCopy[i].value) {
        state.steps.push({
          mutation: 'swap',
          payload: [i - 1, i],
          codeBlock: `block4`,
          explanation: `Swapping ${arrayCopy[i - 1].value} and ${arrayCopy[i].value}\nSet swapped flag to true`
        });
        let temp = arrayCopy[i - 1];
        arrayCopy[i - 1] = arrayCopy[i];
        arrayCopy[i] = temp;
        swapped = true;
      }
    }
    state.steps.push({
      mutation: 'done',
      payload: [n - 1, n - 2],
      codeBlock: 'block5',
      explanation: `${arrayCopy[n - 1].value} is sorted\nAs swap flag is set to true, loop again`
    });
    n -= 1;
  } while (swapped);
  while (n) {
    state.steps.push({
      mutation: 'done',
      payload: [n - 1, n - 2],
      codeBlock: 'block5',
      explanation:
        n > 1
          ? `${arrayCopy[n - 1].value} is sorted\nAs swap flag is set to true, loop again`
          : `As swap flag is set to false, end while loop\nBubble sort is now completed`
    });
    n--;
  }
}
