let updateCount = 0;    

function getShade(value) {
    if (value >= 0) {
    const green = Math.min(255, 100 + value * 1.5);
    return `rgb(0, ${green}, 0)`;
