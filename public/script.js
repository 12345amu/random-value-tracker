let updateCount = 0;    

function getShade(value) {
    if (value >= 0) {
    const green = Math.min(255, 100 + value * 1.5);
    return `rgb(0, ${green}, 0)`;
      } else {
    const red = Math.min(255, 100 + Math.abs(value) * 1.5);
    return `rgb(${red}, 0, 0)`;
  }
}

function updateBox(data) {
  const valueBox = document.getElementById('valueBox');
  const trendEl = document.getElementById('trend');
  const currentValueEl = document.getElementById('currentValue');
  const updateCountEl = document.getElementById('updateCount');

  valueBox.textContent = data.value;
  valueBox.style.backgroundColor = getShade(data.value);
  trendEl.textContent = data.trend;
  currentValueEl.textContent = data.value;

  updateCount++;
  updateCountEl.textContent = updateCount;
}

const evtSource = new EventSource('/api/current-value');

evtSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateBox(data);
};

evtSource.onerror = (err) => {
  console.error('SSE connection error:', err);
};
