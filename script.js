import Queue from './util.js'

const callDelay = (text, ms) => {
  const { checked: qEnabled } = document.querySelector('#qEnabledInput');
  if(qEnabled){
    return Queue.enqueue(() => delay(text, ms));
  }else{
    return delay(text, ms);
  }
};

const delay  = (text, ms) => new Promise((resolve) => setTimeout(() => resolve(text), ms))
  .then(res => {
    const el = document.createElement('div');
    el.classList.add(['first', 'second', 'third'][res - 1]);
    el.innerHTML = `promise <strong>#${res}</strong> is fulfilled`
    document.getElementById('output').appendChild(el);
  });

document.querySelectorAll('.run-promise').forEach((el, i) => {
  el.addEventListener('click', () => {
    const el = document.createElement('span');
    el.innerText = i + 1;
    document.getElementById('queue').appendChild(el);
    callDelay(i + 1, i == 1 ? 5000 : 1000 * (i + 1))
  });
});

document.getElementById('run-all-promises').addEventListener('click', () => {
  ['1', '2', '3'].forEach(x => {
    const el = document.createElement('span');
    el.innerText = x;
    document.getElementById('queue').appendChild(el);
  });
  callDelay('1', 1000);
  callDelay('2', 5000);
  callDelay('3', 3000);
});

document.getElementById('qEnabled').addEventListener('click', () => {
  const { checked: qEnabled } = document.querySelector('#qEnabledInput');
  document.getElementById('cancel').disabled = !qEnabled;
});

// document.getElementById('qLimit').addEventListener('click', () => {
//   const { checked } = document.querySelector('#qLimitInput');
//   if(checked){
//     Queue.limitQueue = true;
//   }
// });

document.getElementById('clear').addEventListener('click',  () => {
  const result = document.getElementById('output');
  const queue = document.getElementById('queue');
  while (result.firstChild) {
      result.removeChild(result.firstChild);
  }
  while (queue.firstChild) {
      queue.removeChild(queue.firstChild);
  }
});

document.getElementById('cancel').addEventListener('click', () => {
  Queue.stop = true;
});
