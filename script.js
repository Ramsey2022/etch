

const default_color = '#333333';
const default_mode = 'default';
const default_size = 16;

let currentColor = default_color;
let currentMode = default_mode;
let currentSize = default_size;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const defaultBtn = document.getElementById('defaultBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');


defaultBtn.onclick = () => setCurrentMode('default');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function updateSizeValue(value) {
  sizeValue.innerText = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerText = '';
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.addEventListener('mousedown', changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === 'default') {
    e.target.style.backgroundColor = currentColor;
  } 
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active');
  } else if (currentMode === 'default') {
    defaultBtn.classList.remove('active');
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active');
  } else if (newMode === 'default') {
    defaultBtn.classList.add('active');
  }
}

window.onload = () => {
  setupGrid(default_size);
  activateButton(default_mode);
}