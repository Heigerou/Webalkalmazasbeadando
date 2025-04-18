let count = 0;

function tick() {
  postMessage(count++);
  setTimeout(tick, 1000);
}

tick();