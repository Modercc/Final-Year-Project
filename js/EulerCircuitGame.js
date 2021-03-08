var circuit = [];
var finalCircuit = [];
var finalDegrees;
var degrees;
var visitedEdges;
var finalVisitedEdges;
var draggableCircuit = document.getElementById('draggable-elements');
var droppableCircuit = document.getElementById('droppable-space');

draggableCircuit.addEventListener("dragstart", dragStart);
droppableCircuit.addEventListener("drop", drop);

// To check if the game can start at all
function circuitExist()
{
  if(PointsArray.length < 3)
    return false;
  for (var i = 0; i < PointsArray.length; i++)
    if(PointsArray[i].degree % 2 == 1)
      return false;
  return true;
}

// Set all variables and event handlers
function startGame()
{
  options.switchOption(4);
  finalDegrees = new Array(PointsArray.length);
  finalCircuit = [];
  degrees = new Array(PointsArray.length);
  finalVisitedEdges = new Array(EdgeArray.length);
  visitedEdges = new Array(EdgeArray.length);
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
}

function initiliazeArr()
{
  circuit = [];
  for (var i = 0; i < degrees.length; i++)
    degrees[i] = finalDegrees[i];
  for (var i = 0; i < visitedEdges.length; i++)
    visitedEdges[i] = finalVisitedEdges[i];
  for (var i = 0; i < PointsArray.length; i++)
    PointsArray[i].styleOption = 1;
  for (var i = 0; i < EdgeArray.length; i++) {
    EdgeArray[i].styleOption = 1;
  }
  while(draggableCircuit.firstChild)
    draggableCircuit.removeChild(draggableCircuit.firstChild);
}

function selectablePoint(selectedPointIndex)
{
  if(finalCircuit.length == 0)
    return true;
  for (var i = 0; i < finalCircuit.length; i++)
    if(finalCircuit[i] == selectedPointIndex && degrees)
      return true;
  return false;
}

window.addEventListener('click', function(event) {
  var selectedPointIndex = getSelectedPointIndex();
  if(options.mode == options.game && selectedPointIndex != undefined)
  {
    console.log(circuit);
    if(circuit.length == 0)
    {
      if(selectablePoint(selectedPointIndex) && degrees[selectedPointIndex] != 0)
        addPoint(selectedPointIndex);
    }
    else
    {
      var connectingEdgeIndex = isConnected(PointsArray[selectedPointIndex], PointsArray[circuit[circuit.length - 1]]);
      if(connectingEdgeIndex != undefined && !visitedEdges[connectingEdgeIndex])
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
    /*
      if(degrees[selectedPointIndex] != 0)
      {
        var connectingEdgeIndex = isConnected(PointsArray[selectedPointIndex], PointsArray[circuit[circuit.length - 1]]);
          if(connectingEdgeIndex == undefined || visitedEdges[connectingEdgeIndex])
          {
            initiliazeArr();
          }
          else
          {
            EdgeArray[connectingEdgeIndex].styleOption = 2;
            degrees[selectedPointIndex] -= 1;
            degrees[circuit[circuit.length - 1]] -= 1;
            visitedEdges[connectingEdgeIndex] = true;
            // Arrow place
          }
          if(finalCircuit.length == 0 || insideFinalCircuit(selectedPointIndex))
          {
        PointsArray[selectedPointIndex].changeColor("red");
        circuit.push(selectedPointIndex);
        var span = document.createElement("span");
        span.innerHTML = PointsArray[selectedPointIndex].symbol;
        span.classList.add("draggable");
        draggableCircuit.appendChild(span);
      }
      */
      if(degrees[selectedPointIndex] == 0 && circuit.length > 2)
      {
        console.log("Circuit created!");
        for (var i = 0; i < circuit.length; i++) {
          EdgeArray[circuit[i]].styleOption = 3;
        }
        draggableCircuit.ondragstart = dragStart;
        var arr = droppableCircuit.children;
        for (var i = 0; i < arr.length; i++) {
          arr[i].addEventListener("dragenter", dragEnter);
          arr[i].addEventListener("dragleave", dragLeave);
          arr[i].addEventListener("drop", drop);
        }
      }
    }
});

function addPoint(pointIndex)
{
  PointsArray[pointIndex].styleOption = 2;
  circuit.push(pointIndex);
  var span = document.createElement("span");
  span.innerHTML = PointsArray[pointIndex].symbol;
  span.classList.add("draggable");
  draggableCircuit.appendChild(span);
}

function mergeCircuits()
{
  var i = 0;
  for (i = 0; i < finalCircuit.length && circuit[0] != finalCircuit[i]; i++);
  console.log(circuit);
  finalCircuit.splice(i, 1, ...circuit);
    console.log(PointsArray[finalCircuit[i]].symbol);
    for (var i = 0; i < finalCircuit.length; i++)
  circuit = [];
  for (var i = 0; i < degrees.length; i++)
    finalDegrees[i] = degrees[i];
  for (var i = 0; i < visitedEdges.length; i++)
    finalVisitedEdges[i] = visitedEdges[i];
}

function writeCircuits()
{
  while (droppableCircuit.firstChild) {
    droppableCircuit.removeChild(droppableCircuit.lastChild);
  }
  for (var i = 0; i < finalCircuit.length; i++) {
    var span = document.createElement("span");
    span.innerHTML = PointsArray[finalCircuit[i]].symbol;
    span.classList.add("draggable");
    span.ondragstart = function() { return false; }
    droppableCircuit.appendChild(span);
    /*
    span.addEventListener("dragenter", dragEnter);
    span.addEventListener("dragleave", dragLeave);
    span.addEventListener("drop", drop);
    */
  }
  while(draggableCircuit.firstChild)
    draggableCircuit.removeChild(draggableCircuit.firstChild);
}

function dragStart(event)
{
  event.dataTransfer.setData("text", event.target.id);
  console.log(event.dataTransfer.getData("text"));
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
  if(event.target != droppableCircuit)
    event.target.style.backgroundColor = "white";
  console.log("USAO");
  if((finalCircuit.length == 0 && event.target == droppableCircuit) || event.target.innerHTML == PointsArray[circuit[0]].symbol)
  {
    mergeCircuits();
    writeCircuits();
    draggableCircuit.ondragstart = function() { return false; };
  }
}
