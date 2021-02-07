var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;
var c = canvas.getContext('2d');

var PointsArray = [];
var EdgeArray = [];

options = {
  mode: undefined,
  select: 0,
  selectedPoint: undefined,
  oldPointx: undefined,
  oldPointy: undefined,
  vertex: 1,
  edges: 2,
  shadowEdge: 0,
  shadowPoint: undefined,
  deleteMode: 3,
  nextChar: 0,
  printEdgeSymbol: false,
  printVertexSymbol: true,
  game: 4,

  switchOption: function(mode) {
    this.mode = mode;
  }
}


window.addEventListener('click', function(event) {
  var bounds = canvas.getBoundingClientRect();
  click.x = event.x - bounds.left;
  click.y = event.y - bounds.top;
  switch (options.mode) {
    case options.vertex:
      var outOfZone = true;
      for (var i = 0; outOfZone && i < PointsArray.length; i++)
      if(PointsArray[i].distance(click.x, click.y) < PointsArray[i].closeZoneRadius) // Should I add + PointsArray[i].radius?
        outOfZone = false;
      if(validPointPosition(click.x, click.y) && outOfZone)
      {
        PointsArray.push(new Circle(click.x, click.y));
        requestAnimationFrame(spawnGraph);
      }
      break;
    case options.deleteMode:
      for (var i = 0; i < PointsArray.length; i++)
        if(PointsArray[i].distance(click.x, click.y) < PointsArray[i].radius)
          {
            for (var j = 0; j < EdgeArray.length;)
              if(EdgeArray[j].point1 == PointsArray[i] || EdgeArray[j].point2 == PointsArray[i])
                EdgeArray.splice(j, 1);
              else
                j++;
            PointsArray.splice(i, 1);
         }
    break;
    default:
  }
});

window.addEventListener('mousedown', function(event)
{
  if(options.mode == options.select)
  {
    for (var i = 0; i < PointsArray.length; i++)
     if(PointsArray[i].distance(hover.x, hover.y) < PointsArray[i].radius)
       {
         options.oldPointx = PointsArray[i].x;
         options.oldPointy = PointsArray[i].y;
         options.selectedPoint = PointsArray[i];
         break;
       }
  }
  if(options.mode == options.edges)
  {
    for (var i = 0; i < PointsArray.length; i++)
      if(PointsArray[i].distance(hover.x, hover.y) < PointsArray[i].radius) // Should I add + PointsArray[i].radius?
      {
        options.shadowEdge = 1;
        options.shadowPoint = PointsArray[i];
        break;
      }
  }
});

window.addEventListener('mouseup', function(event)
{
  if(options.mode == options.select)
  {
    for (var i = 0; i < PointsArray.length; i++)
     if(PointsArray[i].distance(hover.x, hover.y) < PointsArray[i].closeZoneRadius && PointsArray[i] != options.selectedPoint)
       {
         options.selectedPoint.x = options.oldPointx;
         options.selectedPoint.y = options.oldPointy;
         break;
       }
    options.selectedPoint = undefined;
  }
  if(options.mode == options.edges)
  {
    for (var i = 0; i < PointsArray.length; i++)
      if(PointsArray[i].distance(hover.x, hover.y) < PointsArray[i].radius) // Should I add + PointsArray[i].radius?
        if(validEdge(options.shadowPoint, PointsArray[i]))
          {
            EdgeArray.push(new Edge(options.shadowPoint, PointsArray[i]));
            break;
          }
      options.shadowEdge = 0;
  }
});

window.addEventListener('mousemove', function(event) {
  var bounds = canvas.getBoundingClientRect();
  hover.x = event.x - bounds.left;
  hover.y = event.y - bounds.top;
  if(options.mode == options.select && options.selectedPoint != undefined)
  {
    options.selectedPoint.x = hover.x;
    options.selectedPoint.y = hover.y;
  }
  requestAnimationFrame(spawnGraph);
});

var click = {
  x: undefined,
  y:undefined
}

var hover = {
  x: undefined,
  y: undefined
}

var drag = {
  x: undefined,
  y: undefined
}

function validPointPosition(x, y)
{
  if(x + 10 > canvas.width || x - 10 <0 || y + 10 > canvas.height || y- 10 < 0)
    return false;
  return true;
}

function isConnected(point1, point2)
{
  if(point1 == undefined || point2 == undefined)
    return undefined;
  for (var i = 0; i < EdgeArray.length; i++)
    if((EdgeArray[i].point1 == point1 && EdgeArray[i].point2 == point2) || (EdgeArray[i].point1 == point2 && EdgeArray[i].point2 == point1))
      return i;
  return undefined;
}

// Class Circle is used for drawing points.

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.closeZoneRadius = 50;
  this.symbol = getNextChar();
  this.color = 'white';
  this.degree = 0;

  this.distance = function(x, y) {
    return Math.sqrt(Math.pow(x-this.x, 2) + Math.pow(y-this.y, 2));
  }

  this.changeColor = function(color)
  {
    this.color = color;
  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill()
    if(options.printVertexSymbol)
    {
      c.font = "30px Arial";
      c.strokeText(this.symbol, this.x + this.radius, this.y + this.radius);
    }
  }

  this.drawCloseZone = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.closeZoneRadius, 0, Math.PI*2, false);
    c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    c.fill();
  }

  this.update = function() {
    if(this.distance(hover.x, hover.y) < this.closeZoneRadius)
      {
        this.drawCloseZone();
      }
    this.draw();
  }
}

// Class Edge is used for drawing edges.

function getNextChar()
{
  var a = 'a';
  a = String.fromCharCode(a.charCodeAt() + options.nextChar);
  options.nextChar += 1;
  return a;
}

function validEdge(point1, point2) {

  if(point1 == point2)
    return false;
  for (var i = 0; i < EdgeArray.length; i++)
    if((EdgeArray[i].point1 === point1 && EdgeArray[i].point2 === point2)
    || (EdgeArray[i].point1 === point2 && EdgeArray[i].point2 === point1))
      return false;
  return true;
}

function Edge(point1, point2)
{
  this.point1 = point1;
  this.point1.degree++;
  this.point2 = point2;
  this.point2.degree++;
  this.symbol = getNextChar();
  this.color = "white";
  console.log(point1.degree);

  this.symbolCoordinates = function()
  {
    var a = this.point1.y - this.point2.y;
    var b = this.point2.x - this.point1.x;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    a /= c;
    b /= c;
    var x = (this.point1.x + this.point2.x) / 2 + a * 10;
    var y = (this.point1.y + this.point2.y) / 2 + b * 10;
    return [x, y];
  }

  this.draw = function() {
    c.beginPath();
    c.moveTo(this.point1.x, this.point1.y);
    c.lineTo(this.point2.x, this.point2.y);
    c.strokeStyle = this.color;
    c.lineWidth = 1;
    c.stroke();
    if(options.printEdgeSymbol)
    {
      var symbolCoo = [];
      symbolCoo = this.symbolCoordinates();
      c.font = "30px Arial";
      c.strokeText(this.symbol, symbolCoo[0], symbolCoo[1]);
      c.strokeText("Q", 100, 100);
    }
  }
}

function spawnGraph()
{
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < PointsArray.length; i++) {
    PointsArray[i].update();
  }
  for (var i = 0; i < EdgeArray.length; i++) {
    EdgeArray[i].draw();
  }
  if(options.shadowEdge == 1)
  {
    var secondPoint = {
      x: hover.x,
      y: hover.y
    };
    for (var i = 0; i < PointsArray.length; i++)
      if(PointsArray[i].distance(hover.x, hover.y) < PointsArray[i].radius) // Should I add + PointsArray[i].radius?
        {
          secondPoint.x = PointsArray[i].x;
          secondPoint.y = PointsArray[i].y;
        }
    c.beginPath();
    c.moveTo(options.shadowPoint.x, options.shadowPoint.y);
    c.lineTo(secondPoint.x, secondPoint.y);
    c.strokeStyle = "#ffffff";
    c.stroke();
  }
}
