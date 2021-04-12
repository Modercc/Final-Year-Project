var gameMode = 1;
var sum;
var selected;
options.edgeLength = true;
var kruksalPoint;
var generateIndex = 0;

function generateExercise()
{
  options.nextChar = 0;
  for (var i = 0; i < PointsArray.length; i++)
    console.log("x = " + PointsArray[i].x + " y = " + PointsArray[i].y);
  PointsArray = [];
  EdgeArray = [];
  switch (generateIndex) {
    case 0:
      var point = new Circle(100, 100);
      PointsArray.push(point);
      var point = new Circle(200, 100);
      PointsArray.push(point);
      var point = new Circle(300, 100);
      PointsArray.push(point);
      var point = new Circle(100, 200);
      PointsArray.push(point);
      var point = new Circle(300, 200);
      PointsArray.push(point);
      var point = new Circle(400, 200);
      PointsArray.push(point);
      var point = new Circle(50, 300);
      PointsArray.push(point);
      var point = new Circle(300, 300);
      PointsArray.push(point);
      var point = new Circle(400, 300);
      PointsArray.push(point);
      var point = new Circle(200, 400);
      PointsArray.push(point);
      var edge = new Edge(PointsArray[0], PointsArray[1]);
      edge.length = 4;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[2]);
      edge.length = 4;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[0], PointsArray[3]);
      edge.length = 1;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[3]);
      edge.length = 4;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[5]);
      edge.length = 1;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[9]);
      edge.length = 10;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[4]);
      edge.length = 2;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[6]);
      edge.length = 5;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[6], PointsArray[9]);
      edge.length = 2;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[8], PointsArray[9]);
      edge.length = 3;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[7], PointsArray[8]);
      edge.length = 3;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[7], PointsArray[9]);
      edge.length = 4;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[4], PointsArray[7]);
      edge.length = 2;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[5], PointsArray[7]);
      edge.length = 3;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[5], PointsArray[8]);
      edge.length = 5;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[9]);
      edge.length = 6;
      EdgeArray.push(edge);
      break;
    case 1:
      var point = new Circle(70, 200);
      PointsArray.push(point);
      var point = new Circle(305, 100);
      PointsArray.push(point);
      var point = new Circle(300, 300);
      PointsArray.push(point);
      var point = new Circle(505, 100);
      PointsArray.push(point);
      var point = new Circle(500, 300);
      PointsArray.push(point);
      var edge = new Edge(PointsArray[0], PointsArray[1]);
      edge.length = 10;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[0], PointsArray[2]);
      edge.length = 5;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[2]);
      edge.length = 2;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[1]);
      edge.length = 3;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[3]);
      edge.length = 1;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[3]);
      edge.length = 9;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[4]);
      edge.length = 2;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[4]);
      edge.length = 4;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[4], PointsArray[3]);
      edge.length = 6;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[4], PointsArray[0]);
      edge.length = 2;
      EdgeArray.push(edge);
      break;
      case 2:

      break;
      case 3:

      break;
      case 4:

      break;
      case 5:

      break;
  }
  generateIndex = (generateIndex + 1) % 6;
}

function startGame()
{
  console.log(gameMode);
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
        if(EdgeArray[selectedEdgeIndex].length > minimumValue()){
          document.getElementById('modalTitle').innerHTML='Warning!';
          document.getElementById('modalBody').innerHTML='Edge length not minimal!';
          $("#alertModal").modal('show');

        }
        else
        if(sameTree(getIndex(EdgeArray[selectedEdgeIndex].point1), getIndex(EdgeArray[selectedEdgeIndex].point2)))
        {
        document.getElementById('modalTitle').innerHTML='Warning!';
        document.getElementById('modalBody').innerHTML='Vertices of the edge are inside the same tree!';
        $("#alertModal").modal('show');
      }
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
            if(kruksalPoint != null)
            {
              console.log(kruksalPoint);
              PointsArray[kruksalPoint].styleOption = 2;
            }
          }
          else
          {
            var selectedEdgeIndex = selectEdge();
            if(selectedEdgeIndex != null)
            {
              if(EdgeArray[selectedEdgeIndex].length > minimumValue2())
              {
                document.getElementById('modalTitle').innerHTML='Warning!';
                document.getElementById('modalBody').innerHTML='Edge length not minimal!';
                $("#alertModal").modal('show');
              }
              else
                  if(!sameTree(getIndex(EdgeArray[selectedEdgeIndex].point1), getIndex(EdgeArray[selectedEdgeIndex].point2)) && (sameTree(kruksalPoint, getIndex(EdgeArray[selectedEdgeIndex].point1)) || sameTree(kruksalPoint, getIndex(EdgeArray[selectedEdgeIndex].point2))))
                  {
                    addEdge(selectedEdgeIndex);
                  }
                  else
                  {
                    document.getElementById('modalTitle').innerHTML='Warning!';
                    document.getElementById('modalBody').innerHTML='Vertices of the edge are inside the same tree!';
                    $("#alertModal").modal('show');
                  }
              }
        }
    }
    size = connectedSpanningTree();
    if(size == PointsArray.length)
    {
      document.getElementById('modalTitle').innerHTML='Congratulations!';
      document.getElementById('modalBody').innerHTML='End of the game!';
      $("#alertModal").modal('show');
      options.mode = 0;
    }
  }
})
