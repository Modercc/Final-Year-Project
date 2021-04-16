var canvas = document.querySelector('canvas');
canvas.width = document.getElementById('canvasDiv').offsetWidth;
canvas.height = document.getElementById('canvasDiv').offsetHeight*0.7;
var c = canvas.getContext('2d');

// Arrays for storing vertices and edges
var PointsArray = [];
var EdgeArray = [];

// Object for contrloing different graph options
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
  edgeLength: false,
  multipleEdges: false,
  drawArrows: false,

  switchOption: function(mode) {
    this.mode = mode;
  }
}

function resetGraphStyle()
{
  for (var i = 0; i < PointsArray.length; i++)
    PointsArray[i].styleOption = 1;
  for (var i = 0; i < EdgeArray.length; i++)
    EdgeArray[i].styleOption = 1;
}

// Handling click events
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
    case options.select:
      if(options.selectedPoint == undefined)
      {

      }
    break;
    default:
  }
});

//b = [a, a = b][0];

var diff = 10;
function selectEdge()
{
  for (var i = 0; i < EdgeArray.length; i++)
    if(EdgeArray[i].distance(hover.x, hover.y))
      return i;
  return undefined;
}

// Checking if the graph is connected
function connectedGraph()
{
  var visited = new Array(PointsArray.lenth);
  var vertices = [];
  vertices.push(0);
  dfsIndex = 0;
  visited[0] = true;
  while(dfsIndex < vertices.length)
  {
    for (var i = 0; i < EdgeArray.length; i++)
    {
      if(EdgeArray[i].point1 == PointsArray[vertices[dfsIndex]])
      {
        var j = getIndex(EdgeArray[i].point2);
        if(!visited[j])
        {
          visited[j] = true;
          vertices.push(j);
        }
      }
      else
        if(EdgeArray[i].point2 == PointsArray[vertices[dfsIndex]])
        {
          var j = getIndex(EdgeArray[i].point1);
          if(!visited[j])
          {
            visited[j] = true;
            vertices.push(j);
          }
        }
    }
    dfsIndex++;
  }
  if(vertices.length == PointsArray.length)
    return true;
  else
    return false;
}

// Hnadling mousedown events
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

// Handling mouseup events
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
            var edge = new Edge(options.shadowPoint, PointsArray[i]);
            EdgeArray.push(edge);
            // Getting edge length from the user
            if(options.edgeLength)
              edge.length = parseInt(prompt("Enter the lenth of the edge:"));
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

function getIndex(point)
{
  for (var i = 0; i < PointsArray.length; i++)
    if(PointsArray[i] === point)
      return i
  return undefined;
}

// Class Circle is used for drawing points.

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.closeZoneRadius = 50;
  this.symbol = getNextChar();
  this.styleOption = 1;
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
    switch (this.styleOption) {
      case 1:
        c.fillStyle = "#F2DCE0";
        break;
      case 2:
        c.fillStyle = "#D94862";
        break;
      case 3:
        c.fillStyle = "#BF5A36";
        break;
      case 4:
        c.fillStyle = "#D99379";
        break;
      default:

    }
    c.fill()
    if(options.printVertexSymbol)
    {
      c.fillStyle = "white";
      c.font = "30px Arial";
      c.fillText(this.symbol, this.x + this.radius, this.y + this.radius);
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
  if(!options.multipleEdges)
  {
    for (var i = 0; i < EdgeArray.length; i++)
      if((EdgeArray[i].point1 === point1 && EdgeArray[i].point2 === point2)
      || (EdgeArray[i].point1 === point2 && EdgeArray[i].point2 === point1))
        return false;
  }
  return true;
}

function Edge(point1, point2)
{
  this.point1 = point1;
  this.point1.degree++;
  this.point2 = point2;
  this.point2.degree++;
  this.symbol = getNextChar();
  this.styleOption = 1;
  this.length = 0;
  this.offset = 0;
  this.controlPointParametar = 70;

  this.distance = function(x, y)
  {
    if(((x < point1.x + 10 && x < point2.x + 10) || (x > point2.x - 10 && x > point1.x - 10)) && ((y < point1.y + 10 && y < point2.y + 10) || (y > point2.y - 10 && y > point1.y - 10)))
      return false;
    var a = this.point2.x - this.point1.x;
    var b = this.point2.y - this.point1.y;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    var distance = Math.abs(a * (this.point1.y - y) - b * (this.point1.x - x)) / c;
    if(distance < 10)
      return true;
    else
      return false;
  }

// Function for drawing arrows
  this.arrowDraw = function() {
  var size = 15;
  var eCoor = this.multipleEdges();
  var xcp = eCoor[0]
  var ycp = eCoor[1];
  var dx = this.point2.x - xcp;
  var dy = this.point2.y - ycp;
  var angle = Math.atan2(dy, dx);
  c.moveTo(this.point2.x, this.point2.y);
  c.lineTo(this.point2.x - size * Math.cos(angle - Math.PI / 15), this.point2.y - size * Math.sin(angle - Math.PI / 15));
  c.moveTo(this.point2.x, this.point2.y);
  c.lineTo(this.point2.x - size * Math.cos(angle + Math.PI / 15), this.point2.y - size * Math.sin(angle + Math.PI / 15));
}

// Function for showing symbols inside graphs
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

// Function for handling multiple edges case
  this.multipleEdges = function()
  {
    number = this.identicalEdgesNumber();
    var point1;
    var point2;
    if(this.point1.x > this.point2.x || (this.point1.x == this.point2.x && this.point1.y > this.point2.y))
    {
      point1 = this.point1;
      point2 = this.point2;
    }
    else
    {
      point1 = this.point2;
      point2 = this.point1;
    }
    var a = point1.y - point2.y;
    var b = point2.x - point1.x;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    a /= c;
    b /= c;
    var xcp = (point1.x + point2.x) / 2 - a * this.controlPointParametar * (number - 1) / 2;
    var ycp = (point1.y + point2.y) / 2 - b * this.controlPointParametar * (number - 1) / 2;
    xcp += a * this.controlPointParametar * this.edgeOrder();
    ycp += b * this.controlPointParametar * this.edgeOrder();
    return [xcp, ycp, a, b];
  }

  this.setLength = function(length) {
    this.length = length;
  }

  this.identicalEdgesNumber = function() {
    var count = 0;
    for (var i = 0; i < EdgeArray.length; i++)
      if((EdgeArray[i].point1 === this.point1 && EdgeArray[i].point2 === this.point2)
      || (EdgeArray[i].point1 === this.point2 && EdgeArray[i].point2 === this.point1))
        count++;
    return count;
  }

  this.edgeOrder = function() {
    var order = 0;
    for (var i = 0; i < EdgeArray.length; i++)
      if(EdgeArray[i] == this)
        return order;
      else
        if((EdgeArray[i].point1 === this.point1 && EdgeArray[i].point2 === this.point2)
        || (EdgeArray[i].point1 === this.point2 && EdgeArray[i].point2 === this.point1))
          order++;
    return undefined;
  }

  this.draw = function() {
    c.beginPath();
    var eCoor = this.multipleEdges();
    c.moveTo(this.point1.x, this.point1.y);
    c.quadraticCurveTo(eCoor[0], eCoor[1], this.point2.x, this.point2.y);
    if(options.drawArrows)
      this.arrowDraw();
    switch (this.styleOption) {
      case 1:
        c.strokeStyle = "rgba(255, 255, 255, 0.9)";
        c.lineWidth = 1;
        c.stroke();
        break;
      case 2:
        c.strokeStyle = "#A62139";
        c.lineWidth = 1;
        c.stroke();
        break;
      case 3:
        c.setLineDash([4, 2]);
        c.lineDashOffset = -this.offset;
        c.strokeStyle = "#0367A6";
        c.stroke();
        this.offset++;
        if(this.offset > 16)
          this.offset = 0;
        c.setLineDash([]);
        break;
      case 4:
        c.strokeStyle = "#BF5A36";
        c.lineWidth = 1;
        c.stroke();
        break;
      default:

    }
    if(options.printEdgeSymbol)
    {
      c.fillStyle = "white";
      var symbolCoo = [];
      symbolCoo = this.multipleEdges();
      c.font = "30px Arial";
      c.fillText(this.symbol, symbolCoo[0], symbolCoo[1]);
    }
    if(options.edgeLength)
    {
      c.fillStyle = "white";
      var symbolCoo = [];
      symbolCoo = this.multipleEdges();
      c.font = "30px Arial";
      c.fillText(this.length, symbolCoo[0] + symbolCoo[2] * 10, symbolCoo[1] + symbolCoo[3] * 10);
    }
  }
}

function getSelectedPointIndex()
{
  for (var i = 0; i < PointsArray.length; i++)
    if(PointsArray[i].distance(hover.x, hover.y) < PointsArray[i].radius)
      return i;
  return undefined;
}

// Function for graph graphics
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

setInterval(spawnGraph, 50);
