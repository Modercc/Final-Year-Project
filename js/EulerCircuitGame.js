// Declaring and initalizing necessary variables
var circuit = [];
var finalCircuit = [];
var finalDegrees;
var degrees;
var visitedEdges;
var finalVisitedEdges;
var draggableCircuit = document.getElementById('draggable-elements');
var droppableCircuit = document.getElementById('droppable-space');
var generateIndex = 0;

// Adding event listeners for the drag and drop event
draggableCircuit.addEventListener("dragstart", dragStart);
droppableCircuit.addEventListener("drop", drop);

// Selecting multiple edges graph option
options.multipleEdges = true;

// To check if the game can start at all
function circuitExist()
{
  if(PointsArray.length < 3)
    return false;
  for (var i = 0; i < PointsArray.length; i++)
    if(PointsArray[i].degree % 2 == 1)
      return false;
  if(!connectedGraph())
    return false;
  return true;
}

// Function to generate exercises
function generateExercise()
{
  options.nextChar = 0;
  PointsArray = [];
  EdgeArray = [];
  switch (generateIndex) {
    case 0:
      var point = new Circle(100, 100);
      PointsArray.push(point);
      var point = new Circle(100, 300);
      PointsArray.push(point);
      var point = new Circle(200, 200);
      PointsArray.push(point);
      var point = new Circle(300, 100);
      PointsArray.push(point);
      var point = new Circle(300, 300);
      PointsArray.push(point);
      var edge = new Edge(PointsArray[0], PointsArray[1]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[0], PointsArray[2]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[4]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[4], PointsArray[2]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[2]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[3]);
      EdgeArray.push(edge);
      break;
    case 1:
      var point = new Circle(100, 100);
      PointsArray.push(point);
      var point = new Circle(100, 300);
      PointsArray.push(point);
      var point = new Circle(100, 500);
      PointsArray.push(point);
      var point = new Circle(300, 100);
      PointsArray.push(point);
      var point = new Circle(300, 300);
      PointsArray.push(point);
      var point = new Circle(300, 500);
      PointsArray.push(point);
      var edge = new Edge(PointsArray[0], PointsArray[1]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[2]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[4]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[4], PointsArray[5]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[0], PointsArray[3]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[4]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[4]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[5]);
      EdgeArray.push(edge);
      break;
      case 2:
      var point = new Circle(200, 100);
      PointsArray.push(point);
      var point = new Circle(100, 200);
      PointsArray.push(point);
      var point = new Circle(300, 200);
      PointsArray.push(point);
      var point = new Circle(100, 300);
      PointsArray.push(point);
      var point = new Circle(300, 300);
      PointsArray.push(point);
      var point = new Circle(200, 400);
      PointsArray.push(point);
      var edge = new Edge(PointsArray[0], PointsArray[1]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[0], PointsArray[2]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[2]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[3]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[4]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[3]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[4]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[4]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[5]);
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[4], PointsArray[5]);
      EdgeArray.push(edge);
      break;
      case 3:

      break;
  }
  generateIndex = (generateIndex + 1) % 4;
}

// Set all variables and event handlers
function startGame()
{
  if(circuitExist())
  {
    options.switchOption(4);
    degrees = new Array(PointsArray.length);
    finalDegrees = new Array(PointsArray.length);
    finalCircuit = [];
    visitedEdges = new Array(EdgeArray.length);
    finalVisitedEdges = new Array(EdgeArray.length);
    for (var i = 0; i < degrees.length; i++)
      finalDegrees[i] = PointsArray[i].degree;
    for (var i = 0; i < visitedEdges.length; i++)
      finalVisitedEdges[i] = false;
    initiliazeArr();
    droppableCircuit.addEventListener("drop", drop);
    droppableCircuit.addEventListener("dragenter", dragEnter);
    droppableCircuit.addEventListener("dragleave", dragLeave);
    droppableCircuit.addEventListener("dragover", dragover);
    draggableCircuit.ondragstart = function() { return false; };
    droppableCircuit.innerHTML = "";
  }
  else{
  document.getElementById('modalTitle').innerHTML='Warning';
  document.getElementById('modalBody').innerHTML='Circuit does not exist';
  $("#alertModal").modal('show');}

}

// Function reinitialize arrays
function initiliazeArr()
{
  circuit = [];
  for (var i = 0; i < degrees.length; i++)
    degrees[i] = finalDegrees[i];
  for (var i = 0; i < visitedEdges.length; i++)
    visitedEdges[i] = finalVisitedEdges[i];
  for (var i = 0; i < PointsArray.length; i++)
    PointsArray[i].styleOption = 1;
  for (var i = 0; i < EdgeArray.length; i++)
    if(!finalVisitedEdges[i])
      EdgeArray[i].styleOption = 1;
  draggableCircuit.innerHTML = "";
}

// Functions for checking if a vertex can be added to the circuit
function selectablePoint(selectedPointIndex)
{
  if(finalCircuit.length == 0)
    return true;
  for (var i = 0; i < finalCircuit.length; i++)
    if(finalCircuit[i] == selectedPointIndex && degrees)
      return true;
  return false;
}

// Function to check if two vertices are connected
function isConnected(point1, point2)
{
  if(point1 == undefined || point2 == undefined)
    return undefined;
  for (var i = 0; i < EdgeArray.length; i++)
    if(((EdgeArray[i].point1 == point1 && EdgeArray[i].point2 == point2) || (EdgeArray[i].point1 == point2 && EdgeArray[i].point2 == point1)) && !visitedEdges[i])
      return i;
return undefined;
}

// Click event handler
window.addEventListener('click', function(event) {
  var selectedPointIndex = getSelectedPointIndex();
  if(options.mode == options.game && selectedPointIndex != undefined)
  {
    if(circuit.length == 0)
    {
      if(selectablePoint(selectedPointIndex) && degrees[selectedPointIndex] != 0)
        addPoint(selectedPointIndex);
    }
    else
    {
      var connectingEdgeIndex = isConnected(PointsArray[selectedPointIndex], PointsArray[circuit[circuit.length - 1]]);
      if(connectingEdgeIndex != undefined)
      {
        EdgeArray[connectingEdgeIndex].styleOption = 2;
        degrees[selectedPointIndex] -= 1;
        degrees[circuit[circuit.length - 1]] -= 1;
        visitedEdges[connectingEdgeIndex] = true;
        addPoint(selectedPointIndex);
      }
      else
        initiliazeArr();
    }
  }
});

// Adding vertices to the merging boxes
function addPoint(pointIndex)
{
  PointsArray[pointIndex].styleOption = 2;
  circuit.push(pointIndex);
  var span = document.createElement("span");
  span.innerHTML = PointsArray[pointIndex].symbol;
  span.classList.add("badge");
  span.classList.add("badge-pill");
  span.classList.add("badge-light");
  span.classList.add("draggable");
  draggableCircuit.appendChild(span);
  if(degrees[pointIndex] == 0)
  {
    //show("circuit is created");
    document.getElementById('modalTitle').innerHTML='Notification!';
    document.getElementById('modalBody').innerHTML='Circuit is created! Drag the newly obtained circuit to the merging box below.';
    $("#alertModal").modal('show');
    for (var i = 0; i < visitedEdges.length; i++)
      if(visitedEdges[i] && !finalVisitedEdges[i])
        EdgeArray[i].styleOption = 3;
    draggableCircuit.ondragstart = dragStart;
    var arr = droppableCircuit.children;
    for (var i = 0; i < arr.length; i++)
    {
      arr[i].addEventListener("dragenter", dragEnter);
      arr[i].addEventListener("dragleave", dragLeave);
      arr[i].addEventListener("drop", drop);
    }
  }
}

// Function for checking if the Euler Circuit is successfully created
function pathCreated()
{
  for (var i = 0; i < finalDegrees.length; i++)
    if(finalDegrees[i] != 0)
      return false;
  return true;
}

// Function to merge circuits
function mergeCircuits()
{
  var i = 0;
  for (i = 0; i < finalCircuit.length && circuit[0] != finalCircuit[i]; i++);
  finalCircuit.splice(i, 1, ...circuit);
  circuit = [];
  for (var i = 0; i < degrees.length; i++)
    finalDegrees[i] = degrees[i];
  for (var i = 0; i < visitedEdges.length; i++)
    if(visitedEdges[i] && !finalVisitedEdges[i])
    {
      finalVisitedEdges[i] = visitedEdges[i];
      EdgeArray[i].styleOption = 4;
    }
  for (var i = 0; i < PointsArray.length; i++)
    PointsArray[i].styleOption = 1;
  if(pathCreated()){
  document.getElementById('modalTitle').innerHTML='Congratulations!';
  document.getElementById('modalBody').innerHTML='End of the game!';
  $("#alertModal").modal('show');}

}

// Function for displaying circuits
function writeCircuits()
{
  while (droppableCircuit.firstChild) {
    droppableCircuit.removeChild(droppableCircuit.lastChild);
  }
  for (var i = 0; i < finalCircuit.length; i++) {
    var span = document.createElement("span");
    span.innerHTML = PointsArray[finalCircuit[i]].symbol;

    span.classList.add("draggable");
    span.classList.add("badge");
    span.classList.add("badge-pill");
    span.classList.add("badge-light");
    span.ondragstart = function() { return false; }
    droppableCircuit.appendChild(span);
  }
  while(draggableCircuit.firstChild)
    draggableCircuit.removeChild(draggableCircuit.firstChild);
}

// Handling drag and drop events for the merging boxes
function dragStart(event)
{
  event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event)
{
  event.preventDefault();
  event.target.classList.add("hover");
  if(event.target.innerHTML == PointsArray[circuit[0]].symbol)
    event.target.style.backgroundColor = "green";
  else
    event.target.style.backgroundColor = "red";
}

function dragLeave(event)
{
  event.target.classList.remove("hover");
  if(event.target != droppableCircuit)
    event.target.style.backgroundColor = "red";
}

function dragover(event)
{
  event.preventDefault();
}

function drop(event)
{
  event.preventDefault();
  event.target.classList.remove("hover");
  if((finalCircuit.length == 0 && event.target == droppableCircuit) || (circuit.length != 0 && event.target.innerHTML == PointsArray[circuit[0]].symbol))
  {
    mergeCircuits();
    writeCircuits();
    draggableCircuit.ondragstart = function() { return false; };
  }
}
