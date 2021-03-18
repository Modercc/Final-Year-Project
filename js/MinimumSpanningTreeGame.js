var gameMode = 1;
var sum;
var selected;
options.edgeLength = true;
var kruksalPoint;

function startGame()
{
  kruksalPoint = undefined;
  options.switchOption(4);
  selected = new Array(EdgeArray.length);
  sum = 0;
  resetGraphStyle();
  for (var i = 0; i < EdgeArray.length; i++)
    selected[i] = false;
  console.log(connectedGraph());
}

function sameTree(point1Index, point2Index)
{
  if(point1Index == point2Index)
    return true;
  var visited = new Array(PointsArray.lenth);
  var vertices = [];
  /*
  var point1Index = getIndex(EdgeArray[edgeIndex].point1);
  var point2Index = getIndex(EdgeArray[edgeIndex].point2);
  */
  vertices.push(point1Index);
  visited[point1Index] = true;
  dfsIndex = 0;
  while(dfsIndex < vertices.length)
  {
    for (var i = 0; i < EdgeArray.length; i++)
    {
      if(selected[i] && EdgeArray[i].point1 == PointsArray[vertices[dfsIndex]])
      {
        var j = getIndex(EdgeArray[i].point2);
        if(!visited[j])
        {
          visited[j] = true;
          vertices.push(j);
          if(j == point2Index)
            return true;
        }
      }
      else
        if(selected[i] && EdgeArray[i].point2 == PointsArray[vertices[dfsIndex]])
        {
          var j = getIndex(EdgeArray[i].point1);
          if(!visited[j])
          {
            visited[j] = true;
            vertices.push(j);
            if(j == point2Index)
              return true;
          }
        }
    }
    dfsIndex++;
  }
  console.log("Vertices: ");
  for (var i = 0; i < vertices.length; i++) {
    console.log(PointsArray[vertices[i]].symbol + " ");
  }
  return false;
}

function connectedSpanningTree()
{
  var visited = new Array(PointsArray.lenth);
  var vertices = [];
  for (var i = 0; i < selected.length; i++)
    if(selected[i])
      {
        var j = getIndex(EdgeArray[i].point1);
        vertices.push(j);
        visited[j] = true;
        break;
      }
  if(vertices.length == 0)
    return 0;
  dfsIndex = 0;
  while(dfsIndex < vertices.length)
  {
    for (var i = 0; i < EdgeArray.length; i++)
    {
      if(selected[i] && EdgeArray[i].point1 == PointsArray[vertices[dfsIndex]])
      {
        var j = getIndex(EdgeArray[i].point2);
        if(!visited[j])
        {
          visited[j] = true;
          vertices.push(j);
        }
      }
      else
        if(selected[i] && EdgeArray[i].point2 == PointsArray[vertices[dfsIndex]])
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
  return vertices.length;
}

function addEdge(selectedEdgeIndex)
{
  EdgeArray[selectedEdgeIndex].styleOption = 2;
  sum += EdgeArray[selectedEdgeIndex].value;
  selected[selectedEdgeIndex] = true;
}

function minimumValue()
{
  var min = undefined;
  for (var i = 0; i < EdgeArray.length; i++)
    if(!selected[i] && (min == undefined || min > EdgeArray[i].length))
      {
        console.log("Same tree? - " + sameTree(getIndex(EdgeArray[i].point1), getIndex(EdgeArray[i].point2)));
        if(!sameTree(getIndex(EdgeArray[i].point1), getIndex(EdgeArray[i].point2)))
          min = EdgeArray[i].length;
      }
  return min;
}

function minimumValue2()
{
  var min = undefined;
  for (var i = 0; i < EdgeArray.length; i++)
    if(!selected[i] && (min == undefined || min > EdgeArray[i].length))
      {
        console.log("Same tree? - " + sameTree(getIndex(EdgeArray[i].point1), getIndex(EdgeArray[i].point2)));
        if(!sameTree(getIndex(EdgeArray[i].point1), getIndex(EdgeArray[i].point2)) && (sameTree(kruksalPoint, getIndex(EdgeArray[i].point1)) || sameTree(kruksalPoint, getIndex(EdgeArray[i].point2))))
          min = EdgeArray[i].length;
      }
  return min;
}

window.addEventListener('click', function(event) {
  var selectedEdgeIndex = selectEdge();
  if(options.mode == options.game)
  {
  if(gameMode == 1)
    {
      var selectedEdgeIndex = selectEdge();
      if(selectedEdgeIndex != undefined && !selected[selectedEdgeIndex])
      {
        console.log("Minimum value: " + minimumValue());
        if(EdgeArray[selectedEdgeIndex].length > minimumValue())
          alert("Value not minimal!");
        else
        if(sameTree(getIndex(EdgeArray[selectedEdgeIndex].point1), getIndex(EdgeArray[selectedEdgeIndex].point2)))
          alert("Inside the same tree!");
        else
        {
          addEdge(selectedEdgeIndex);
        }
      }
    }
      else
        if(gameMode == 2)
        {
          if(kruksalPoint == undefined)
          {
            kruksalPoint = getSelectedPointIndex();
            console.log(kruksalPoint);
          }
          else
          {
            var selectedEdgeIndex = selectEdge();
            if(EdgeArray[selectedEdgeIndex].length > minimumValue2())
            {
              alert("Not a minimum value");
            }
            else
                if(!sameTree(getIndex(EdgeArray[selectedEdgeIndex].point1), getIndex(EdgeArray[selectedEdgeIndex].point2)) && (sameTree(kruksalPoint, getIndex(EdgeArray[selectedEdgeIndex].point1)) || sameTree(kruksalPoint, getIndex(EdgeArray[selectedEdgeIndex].point2))))
                {
                  addEdge(selectedEdgeIndex);
                }
                else
                {
                  alert("Bridge problem!");
                }
        }
    }
    size = connectedSpanningTree();
    if(size == PointsArray.length)
    {
      alert("Game is completed.");
      options.mode = 0;
    }
  }
})
