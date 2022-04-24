const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('.colorDisplay');
const messageDisplay = document.querySelector('.message');
const h1 = document.querySelector('h1');
const resetBtn = document.querySelector('.resetBtn');
const modeBtn = document.querySelectorAll('.mode')

let numOfSquares = 5;
let colors = [];
let pickedColor;

function setupModeButtons() {
  modeBtn.forEach(element => {
    element.addEventListener('click', function(e) {
      e.target.classList.add('selected');
  
      if (e.target.textContent === 'Easy') {
        numOfSquares = 2
      } else {
        numOfSquares = 5
      }
      reset();
    })
  });
}

function setupSquares() {
  squares.forEach((element, index) => {
  
    element.addEventListener('click', (e) => {
      const clickedColor = e.target.style.background;
  
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        messageDisplay.style.color = pickedColor;
        resetBtn.textContent = 'Play Again?'
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        e.target.style.background = 'rgba(0, 0, 0, 0)';
        messageDisplay.textContent = 'Try again!';
        messageDisplay.style.color = 'red';
      }
    });
  });
  reset();
}

function reset() { 
  colors = generateRandomColors(numOfSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetBtn.textContent = 'New Colors'
  messageDisplay.textContent = ''

  squares.forEach((element, index) => {
    if (colors[index]) {
      element.style.display = 'block';
      element.style.background = colors[index]
    } else {
      element.style.display = 'none';
    }
  });
  h1.style.background = 'rgba(0, 0, 0, 0)';
}

resetBtn.addEventListener('click', function() {
  reset();
})


function changeColors(color) {
  squares.forEach(element => {
    element.style.background = color;
  });
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length)
  return colors[random];
}

function generateRandomColors(num) {
  const arr = [];

  for (let i = 0; i <= num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`
}

function init() {
  setupModeButtons();
  setupSquares();
  reset();
};

init();