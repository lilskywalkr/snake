// declaring variables & appending a fruit into the container
const container = document.querySelector('.container');
const el = document.createElement('div');
el.className = 'fruit';
container.appendChild(el);
const positions = [
  0, 20, 40, 60,
  80, 100, 120, 140,
  160, 180, 200, 220,
  240, 260, 280, 300,
  320, 340, 360, 380,
  400, 420, 440, 460,
  480, 500
];
let snakeTail = document.getElementsByClassName('snake-tail');
const containerFruit = document.querySelector('.fruit');
let points = 0;


// declaring the fruit object
function Fruit() {
  this.positionX = 0;
  this.positionY = 0;

  this.update = function() {
    // the position of the fruit
    this.positionX = positions[Math.floor(Math.random() * 25)];
    this.positionY = positions[Math.floor(Math.random() * 25)];

    containerFruit.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
  }
}

// declaring the snake object
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xPositionSpeed = 0;
  this.yPositionSpeed = 0;
  this.diraction = null;

  this.movements = function() {

    // changing snake's position
    this.x = this.x + this.xPositionSpeed;
    this.y = this.y + this.yPositionSpeed;

    // the snake's teleportation if it reaches one of the X walls
    if (this.x < 0) this.x = (container.clientWidth - snakeTail[0].clientWidth);
    else if (this.x > (container.clientWidth - snakeTail[0].clientWidth)) this.x = 0;
    if (this.y < 0) this.y = (container.clientHeight - snakeTail[0].clientHeight);
    else if (this.y > (container.clientWidth - snakeTail[0].clientWidth)) this.y = 0;

    snakeTail[0].style.transform = `translate(${this.x}px, ${this.y}px)`;
    snakeTail[0].setAttribute("x", String(this.x));
    snakeTail[0].setAttribute("y", String(this.y));
  }

  // checks if the snake has eaten the fruit and replaces fruit's position;
  this.eat = function() {
    if (this.x === fruit.positionX && this.y === fruit.positionY) {
      snakeTail = document.getElementsByClassName('snake-tail');
      let flag;

      do {
        flag = true;
        fruit.update();
        for (let i = 2; i < snakeTail.length && flag; i++) {
          if (fruit.positionX === Number(snakeTail[i].getAttribute('x')) && fruit.positionY === Number(snakeTail[i].getAttribute('y'))) {
            console.log('illigal fruit location occured')
            flag = false;
          }
        }

      } while (!flag)

      // increments the points by one and updates the span element
      ++points;
      document.querySelector('.points p span').textContent = points;

      this.createTail();
    }
  }

  // creating a new tail and appending it to the container
  this.createTail = function() {
    const tail = document.createElement('div');
    tail.className = 'snake-tail';
    
    const prev = snakeTail[snakeTail.length - 1];
    tail.style.transform = `translate(${prev.getAttribute('x')}px, ${prev.getAttribute('y')}px)`;
    container.appendChild(tail);
  }

  this.updateCoordinate = function() {
    snakeTail = document.getElementsByClassName('snake-tail');
  
    for (let i = snakeTail.length - 1; i >= 1; i--) {
      const currentSegment = snakeTail[i];
      const prevSegment = snakeTail[i - 1];
  
      currentSegment.setAttribute('x', prevSegment.getAttribute('x'));
      currentSegment.setAttribute('y', prevSegment.getAttribute('y'));
      currentSegment.style.transform = `translate(${prevSegment.getAttribute('x')}px, ${prevSegment.getAttribute('y')}px)`;
    }
  
    snakeTail[0].setAttribute("x", this.x);
    snakeTail[0].setAttribute("y", this.y);
    snakeTail[0].style.transform = `translate(${this.x}px, ${this.y}px)`;

    for (let i = 2; i < snakeTail.length; i++) {
      if (this.x === Number(snakeTail[i].getAttribute('x')) && this.y === Number(snakeTail[i].getAttribute('y'))) {
        window.clearInterval(init);
        container.innerHTML = "<p>Game Over</p>";
      }
    }
  }

  // triggering snake's moves by pressing a key & achiving points
  this.keyPressed = function(e) {
    if (!e) e = window.event;

    snakeTail = document.getElementsByClassName('snake-tail');

    switch (e.which) {
      case 37:
        if ((this.diraction === 'right' || !this.diraction) && snakeTail.length === 2) {
          this.xPositionSpeed = -20;
          this.diraction = 'left';
        } else if (this.diraction === 'right' && snakeTail.length > 2) {
          this.xPositionSpeed = 20;
          this.diraction = 'right';
        } else if ((this.diraction === 'up' || this.diraction == 'down') && snakeTail.length >= 2) {
          this.xPositionSpeed = -20;
          this.diraction = 'left';
        }

        this.yPositionSpeed = 0
        break;
      case 38:
        if ((this.diraction === 'down' || !this.diraction) && snakeTail.length === 2) {
          this.yPositionSpeed = -20;
          this.diraction = 'up';
        } else if (this.diraction === 'down' && snakeTail.length > 2) {
          this.yPositionSpeed = 20;
          this.diraction = 'down';
        } else if ((this.diraction === 'left' || this.diraction === 'right') && snakeTail.length >= 2) {
          this.yPositionSpeed = -20;
          this.diraction = 'up';
        }

        this.xPositionSpeed = 0;
        break;
      case 39:
        if ((this.diraction === 'left' || !this.diraction) && snakeTail.length === 2) {
          this.xPositionSpeed = 20;
          this.diraction = 'right';
        } else if (this.diraction === 'left' && snakeTail.length > 2) {
          this.xPositionSpeed = -20;
          this.diraction = 'left';
        } else if ((this.diraction === 'up' || this.diraction == 'down') && snakeTail.length >= 2) {
          this.xPositionSpeed = 20;
          this.diraction = 'right';
        }

        this.yPositionSpeed = 0;
        break;
      case 40:
        if ((this.diraction === 'up' || !this.diraction) && snakeTail.length === 2) {
          this.yPositionSpeed = 20;
          this.diraction = 'down';
        } else if (this.diraction === 'up' && snakeTail.length > 2) {
          this.yPositionSpeed = -20;
          this.diraction = 'up';
        } else if ((this.diraction === 'left' || this.diraction === 'right') && snakeTail.length >= 2) {
          this.yPositionSpeed = 20;
          this.diraction = 'down';
        }

        this.xPositionSpeed = 0;
        break;
      default:
        console.log('play with the arrows');
    }
  }
}

// declaring the object models
const snake = new Snake();
const fruit = new Fruit();
let init = null;

// setting down event listeners;
window.addEventListener('DOMContentLoaded', function() {
  fruit.update();
  init = window.setInterval(function() {
    snake.movements();
    snake.eat();
    snake.updateCoordinate();
  }, 80);
}, false)
window.addEventListener('keydown', function(e) {
  snake.keyPressed(e);
}, false);