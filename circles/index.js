const countOfCircles = 10
const circleSize = 50; // px
const blockSize = 500; // px
const contactCoefficient = 0.8; // px
const showNumbers = true; // boolean
let base = [];

const block = document.querySelector('.block');
block.style.width = `${blockSize}px`;
block.style.height = `${blockSize}px`;
const blockCord = block.getBoundingClientRect();

function initFunction() {
  generateBasicCircles();

  base.forEach((object) => {
    rendering(object);
  });
}

function generateBasicCircles() {
  for (let index = 0; index < countOfCircles; index++) {
    const correctCoordinates = getCorrectCoordinates();
    // let clientX = 0;
    // let clientY = 0;
    let clientX = correctCoordinates.x;
    let clientY = correctCoordinates.y;
    let color = getRandomColor();

    const cyrcleSeting = {
      color: color,
      clientX,
      clientY,
      innerText: index + 1,
      id: getUniqId(),
    };

    base.push(cyrcleSeting);
  }
}

function getCorrectCoordinates() {
  let computedCoordinateX = Math.round(getRandomCoordinate(0, blockSize - (circleSize + 2)));
  let computedCoordinateY = Math.round(getRandomCoordinate(0, blockSize - (circleSize + 2)));
  let computedCoordinates = { x: computedCoordinateX, y: computedCoordinateY };

  if (base.length === 0) {
    // the coordinate of the first element will always be in the correct place
    return computedCoordinates;
  }

  base.forEach(item => {
    if (
      (computedCoordinateX > (item.clientX + circleSize)) || (computedCoordinateY > (item.clientY + circleSize)) ||
      (computedCoordinateX < (item.clientX - circleSize)) || (computedCoordinateY < (item.clientY - circleSize))
    ) {
      return computedCoordinates;
    } else {
      computedCoordinates = getCorrectCoordinates();
    }
  });

  return computedCoordinates;
}

function errorFunc() {
  block.style['animation-name'] = 'blink';
  setTimeout(() => {
    block.style['animation-name'] = 'none';
  }, 1000);
}

function getUniqId() {
  return Math.random().toString(16).slice(2);
}

function hex2dec(hex) {
  return hex.replace('#', '').match(/.{2}/g).map(n => parseInt(n, 16));
}

function rgb2hex(r, g, b) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  r = Math.min(r, 255);
  g = Math.min(g, 255);
  b = Math.min(b, 255);
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

function rgb2cmyk(r, g, b) {
  let c = 1 - (r / 255);
  let m = 1 - (g / 255);
  let y = 1 - (b / 255);
  let k = Math.min(c, m, y);
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return [c, m, y, k];
}

function cmyk2rgb(c, m, y, k) {
  let r = c * (1 - k) + k;
  let g = m * (1 - k) + k;
  let b = y * (1 - k) + k;
  r = (1 - r) * 255 + .5;
  g = (1 - g) * 255 + .5;
  b = (1 - b) * 255 + .5;
  return [r, g, b];
}


function mix_cmyks(...cmyks) {
  let c = cmyks.map(cmyk => cmyk[0]).reduce((a, b) => a + b, 0) / cmyks.length;
  let m = cmyks.map(cmyk => cmyk[1]).reduce((a, b) => a + b, 0) / cmyks.length;
  let y = cmyks.map(cmyk => cmyk[2]).reduce((a, b) => a + b, 0) / cmyks.length;
  let k = cmyks.map(cmyk => cmyk[3]).reduce((a, b) => a + b, 0) / cmyks.length;
  return [c, m, y, k];
}

function mix_hexes(...hexes) {
  let rgbs = hexes.map(hex => hex2dec(hex)); 
  let cmyks = rgbs.map(rgb => rgb2cmyk(...rgb));
  let mixture_cmyk = mix_cmyks(...cmyks);
  let mixture_rgb = cmyk2rgb(...mixture_cmyk);
  let mixture_hex = rgb2hex(...mixture_rgb);
  return mixture_hex;
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function getRandomCoordinate(min = 0, max = blockSize) {
  return Math.random() * (max - min) + min;
}

function rendering({ innerText, id, clientX, clientY, width = circleSize, height = circleSize, color }) {
  let div = document.createElement('div');
  let coordinateX = clientX < 0 ? 0 : clientX;
  let coordinateY = clientY < 0 ? 0 : clientY;

  div.className = 'cyrcle';
  if (showNumbers) {
    div.innerText = innerText;
  }
  div.id = id;
  div.style.backgroundColor = color;
  div.style.left = `${coordinateX}px`;
  div.style.top = `${coordinateY}px`;
  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  block.appendChild(div);
}

function moveAt(el) {
  let clientX = el.clientX - (el.target.offsetWidth / 2) - blockCord.left;
  let clientY = el.clientY - (el.target.offsetHeight / 2) - blockCord.top;
  const cord = block.getBoundingClientRect();

  if (clientX < 0) {
    clientX = 0;
  }
  if (clientY < 0) {
    clientY = 0;
  }
  if (clientX + el.target.offsetWidth > cord.width) {
    clientX = cord.width - el.target.offsetWidth;
  }
  if (clientY + el.target.offsetHeight > cord.height) {
    clientY = cord.height - el.target.offsetHeight;
  }

  el.target.style.left = clientX + 'px';
  el.target.style.top = clientY + 'px';
  el.target.style.zIndex = 999;
}

initFunction();

block.addEventListener('dblclick', (event) => {
  // console.log('dblclick', event);

  if (event.target.className === 'cyrcle') { // if you dblclicked on an existing circle - delete it
    base = base.filter(item => item.id !== event.target.id)
    event.target.remove();
    
    return;
  }

  let cord = block.getBoundingClientRect();
  let clientX = event.clientX - (circleSize / 2) - cord.left;
  let clientY = event.clientY - (circleSize / 2) - cord.top;
  let color = getRandomColor();

  if (clientX > (blockSize - circleSize) || clientY > (blockSize - circleSize)) { // if dblclicked close to the visibility area - call errorFunc
    errorFunc();

    return;
  }

  if (base.every(item => 
      ((clientX > (item.clientX + (circleSize * contactCoefficient))) || (clientY > (item.clientY + (circleSize * contactCoefficient)))) ||
      ((clientX < (item.clientX - (circleSize * contactCoefficient))) || (clientY < (item.clientY - (circleSize * contactCoefficient))))
    )) {
    let cyrcleSeting = {
      color: color,
      clientX: clientX,
      clientY: clientY,
      innerText: base.length + 1,
      id: getUniqId(),
    };
  
    base.push(cyrcleSeting);
    rendering(cyrcleSeting);
  } else {
    errorFunc();
  }
});

block.onmousedown = function(el) {
  // console.log('onmousedown', el);
  el.preventDefault();

  if (el.target.className === 'cyrcle') {
    el.target.onmousemove = function(event) {
      // console.log('onmousemove', event);
      moveAt(event);
    }

    el.target.onmouseup = function(event) {
      // console.log('onmouseup', event);
      el.target.style.display = 'none'; // hide element to keep track of the element underneath the one being dragged
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

      if (elemBelow.className === 'cyrcle') {
        elemBelow.remove(); // remove element from DOM
        el.target.remove(); // remove element from DOM
        [event.target.id, elemBelow.id].forEach(id => {
          base = base.filter(item => item.id !== id) // remove elements from base array
        })

        const clientX = event.clientX - (circleSize / 2) - blockCord.left;
        const clientY = event.clientY - (circleSize / 2) - blockCord.top;

        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        const elemBelowBgColor = rgb2hex(elemBelow.style.backgroundColor)
        const targetBgColor = rgb2hex(el.target.style.backgroundColor)

        let cyrcleSeting = {
          color: mix_hexes(elemBelowBgColor, targetBgColor),
          clientX,
          clientY,
          innerText: base.length + 1,
          id: getUniqId(),
        };

        base.push(cyrcleSeting);
        rendering(cyrcleSeting); // create new circle with mixed colors
      }
      el.target.style.display = 'flex';

      
      base = base.map(item => {
        if (item.id === el.target.id) {
          item.clientX = event.clientX - (circleSize / 2) - blockCord.left;
          item.clientY = event.clientY - (circleSize / 2) - blockCord.top;
        }

        return item;
      })

      el.target.onmousemove = null;
      el.target.onmouseup = null;
      el.target.style.zIndex = 1;
    }
  }
}

block.ondragstart = function() {
  return false;
};