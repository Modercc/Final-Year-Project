var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;
var c = canvas.getContext('2d');
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(300, 300, 100, 100);


// console.log(canvas);

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// Arc
// for (var i = 0; i < 5; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI*2, false);
//   c.strokeStyle = 'blue';
//   c.stroke();
// }

/*
function Circle(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, 3, 0, Math.PI*2, false);
    c.strokeStyle = 'black';
    c.fillStyle = 'white';
    c.fill();
    c.stroke();
  }

  this.distance = function(x, y) {
    return Math.sqrt(Math.pow(x-this.x, 2) + Math.pow(y-this.y, 2));
  }

}

var x = 200;
var dx = 4;
var radius = 30;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.beginPath();
  c.arc(x, 200, radius, 0, Math.PI*2, false);
  c.strokeStyle = 'blue';
  c.stroke();
  if(x + radius > innerWidth || x - radius < 0)
    dx = -dx;
  x += dx;
}

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('click', function(event) {
  var bounds = event.target.getBoundingClientRect();
  mouse.x = event.x - bounds.left;
  mouse.y = event.y - bounds.top;
  var circle = new Circle(mouse.x, mouse.y);
  circle.draw();
})

window.addEventListener('mousemove', function(event) {
  var bounds = event.target.getBoundingClientRect();
  mouse.x = event.x - bounds.left;
  mouse.y = event.y - bounds.top;
  var circle = new Circle(mouse.x, mouse.y);
  circle.draw();
})

*/

var mouse = {
  x: undefined,
  y:undefined
}

var maxRadius = 40;
var minRadius = 2;
var colorArray = [
  '#BF2642',
  '#A64521',
  '#D9967E',
  '#732514',
  '#401713',
]

window.addEventListener('mousemove', function(event) {
  var bounds = event.target.getBoundingClientRect();
  mouse.x = event.x - bounds.left;
  mouse.y = event.y - bounds.top;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.7;
  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.dx = -this.dx;
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
      {
        if(this.radius < maxRadius)
        this.radius += 1;
      }
    else
      if(this.radius > this.minRadius)
        this.radius -= 1;
    this.draw();
  }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (canvas.width - 2 * radius) + radius;
    var y = Math.random() * (canvas.height - 2* radius) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

init();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
