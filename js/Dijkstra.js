var selected;
var goal;
var varGoal;
var d;
var b;
var iteration;
var backtracking;
var generateIndex = 0;

options.edgeLength = true;
options.multipleEdges = true;
options.drawArrows = true;

function generateExercise()
{
  options.nextChar = 0;
  for (var i = 0; i < PointsArray.length; i++)
    console.log("x = " + PointsArray[i].x + " y = " + PointsArray[i].y);
  PointsArray = [];
  EdgeArray = [];
  switch (generateIndex) {
    case 0:
      var point = new Circle(100, 200);
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
      edge.length = 3;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[2]);
      edge.length = 1;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[1]);
      edge.length = 4;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[1], PointsArray[3]);
      edge.length = 2;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[3]);
      edge.length = 8;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[2], PointsArray[4]);
      edge.length = 2;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[3], PointsArray[4]);
      edge.length = 7;
      EdgeArray.push(edge);
      var edge = new Edge(PointsArray[4], PointsArray[3]);
      edge.length = 9;
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
  options.switchOption(4);
  selected = [];
  backtracking = false;
  iteration = 1;
  var paragraph = document.getElementById('backtracking');
  paragraph.innerHTML = "";
  var table = document.getElementById('inputSolutionTable');
  table.innerHTML = "";
  var button = document.getElementById('button');
  button.innerHTML = "";
  var set = document.getElementById('set');
  set.innerHTML = "";
  d = new Array(PointsArray.lenth);
  b = new Array(PointsArray.lenth);
  resetGraphStyle();
  for (var i = 0; i < PointsArray.length; i++)
  {
    d[i] = undefined;
    b[i] = undefined;
  }
  document.getElementById('modalTitle').innerHTML='Notification!';
  document.getElementById('modalBody').innerHTML='Select the starting point!';
  $("#alertModal").modal('show');

}

function generateTableHeader()
{
  var theader = '<table id = "table" class = " table table-bordered> <thead class="bg-primary text-light"> <tr> <th> </th>';
  for (var i = 0; i < PointsArray.length; i++)
      theader += '<th scope="col"> ' + PointsArray[i].symbol + ' </th> ';
  theader += "</tr> </thead> <tbody id='solution'> <tr> <td> d: </td>";
  for (var i = 0; i < PointsArray.length; i++)
    if(PointsArray[i] == PointsArray[selected[0]])
      theader += '<td> 0 </td>';
    else
      theader += '<td> inf </td>';
  theader += "</tr> <tr> <td> b: </td>";
  for (var i = 0; i < PointsArray.length; i++)
    theader += '<td> NIL </td>'
  theader += "</tr> </tbody> </table>";
  document.getElementById('inputSolutionTable').innerHTML += theader;
  var button = '<button type="button" class="btn btn-primary" type="button" onclick="checkSolution()">Done</button>';
  document.getElementById('inputSolutionTable').innerHTML += button;
}

function insideSelected(index)
{
  for (var i = 0; i < selected.length; i++)
    if(selected[i] == index)
      return true;
  return false;
}

function minIndex()
{
  var min = undefined;
  for (var i = 0; i < PointsArray.length; i++)
    if(!insideSelected(i) && (min == undefined || d[min] > d[i]))
      min = i;
  return min;
}

function calculateRow()
{
  var top = selected[selected.length - 1];
  for (var i = 0; i < EdgeArray.length; i++)
    if(EdgeArray[i].point1 == PointsArray[top])
    {
      var index = getIndex(EdgeArray[i].point2);
      if((d[index] == undefined || d[index] > d[top] + EdgeArray[i].length) && !insideSelected(index))
      {
        d[index] = d[top] + EdgeArray[i].length;
        b[index] = top;
      }
    }
}

function checkSolution()
{
  var allCorrect = true;
  var table = document.getElementById("solution");
  dRow =  table.rows[table.rows.length - 2];
  bRow =  table.rows[table.rows.length - 1];
  for (var i = 0; i < d.length; i++)
  {
    if(dRow.cells[i + 1].children[0] != undefined)
    {
      var dValue = dRow.cells[i + 1].children[0].value;
      if(isNaN(dValue))
        if(dValue.localeCompare("inf") == 0 && d[i] == undefined)
        {
          dRow.cells[i + 1].removeChild(dRow.cells[i + 1].firstChild);
          dRow.cells[i + 1].innerHTML = "inf";
        }
        else
          {
            dRow.cells[i + 1].children[0].value = "";
            allCorrect = false;
          }
      else
      {
        dValue = parseInt(dValue);
        if(dValue != d[i])
        {
          dRow.cells[i + 1].children[0].value = "";
          allCorrect = false;
        }
        else
        {
          dRow.cells[i + 1].removeChild(dRow.cells[i + 1].firstChild);
          dRow.cells[i + 1].innerHTML = dValue;
        }
      }
    }
    if(bRow.cells[i + 1].children[0] != undefined)
    {
      var bValue = bRow.cells[i + 1].children[0].value;
      if(bValue.localeCompare("nil") == 0)
        if(b[i] == undefined)
        {
          bRow.cells[i + 1].removeChild(bRow.cells[i + 1].firstChild);
          bRow.cells[i + 1].innerHTML = "nil";
        }
        else
        {
          bRow.cells[i + 1].children[0].value = "";
          allCorrect = false;
        }
      else
        if(bValue == PointsArray[b[i]].symbol)
        {
          bRow.cells[i + 1].removeChild(bRow.cells[i + 1].firstChild);
          bRow.cells[i + 1].innerHTML = bValue;
        }
        else
        {
          bRow.cells[i + 1].children[0].value = "";
          allCorrect = false;
        }
      }
  }
  if(allCorrect)
  {
    iteration++;
    if(iteration == PointsArray.length)
    {
      document.getElementById('modalTitle').innerHTML='Notification!';
      document.getElementById('modalBody').innerHTML='Backtracking!';
      $("#alertModal").modal('show');
      backtracking = true;
    }
    else
    {
      selected.push(minIndex());
      generateTableRow();
      calculateRow();
    }
  }
}

function generateTableRow()
{
  var tbody = '<tr> <td> d: </td>';
  for (var i = 0; i < PointsArray.length; i++)
    if(!insideSelected(i))
      tbody += '<td> <input type="text" class="form" placeholder="Value"/> </td>';
    else
      tbody += '<td> ' + d[i] +  ' </td>'
  tbody += ' </tr>';
  tbody += '<tr> <td> b: </td>';
  for (var i = 0; i < PointsArray.length; i++)
    if(!insideSelected(i))
      tbody += '<td> <input type="text" class="form" placeholder="Value"/> </td>';
    else
      if(b[i] == undefined)
        tbody += '<td> nil </td>';
      else
        tbody += '<td> ' + PointsArray[b[i]].symbol +  ' </td>';
  tbody += ' </tr>';
  var setS = "{ ";
  for (var i = 0; i < selected.length; i++)
    if(i == 0)
      setS += PointsArray[selected[i]].symbol;
    else
      setS += ", " + PointsArray[selected[i]].symbol;
  setS += " }";
  document.getElementById('solution').innerHTML += tbody;
  document.getElementById('set').innerHTML = setS;
}

window.addEventListener('click', function(event)
{
  if(options.mode == options.game)
  {
    if(!backtracking)
    {
      switch (selected.length)
      {
        case 0:
          var pointIndex = getSelectedPointIndex();
          if(pointIndex != undefined)
          {
            selected.push(pointIndex);
            d[pointIndex] = 0;
            document.getElementById('modalTitle').innerHTML='Notification!';
            document.getElementById('modalBody').innerHTML='Select the ending point!';
            $("#alertModal").modal('show');
          }
          break;
        case 1:
          var pointIndex = getSelectedPointIndex();
          if(pointIndex != undefined)
          {
            goal = pointIndex;
            varGoal = pointIndex;
            generateTableHeader();
            generateTableRow();
            calculateRow();
          }
          break;
        case 2:

          break;
        default:
      }
    }
    else
    {
        var pointIndex = getSelectedPointIndex();
        var paragraph = document.getElementById('backtracking');
        if(pointIndex != undefined && pointIndex == varGoal)
        {
          console.log(varGoal);
          PointsArray[pointIndex].styleOption = 2;
          if(goal == varGoal)
            {
              paragraph.innerHTML += PointsArray[varGoal].symbol;
            }
            else
            {
              paragraph.innerHTML += " <- " + PointsArray[varGoal].symbol;
            }
            varGoal = b[varGoal];
            if(varGoal == undefined)
            {
              document.getElementById('modalTitle').innerHTML='Congratulations!';
              document.getElementById('modalBody').innerHTML='End of the game!';
              $("#alertModal").modal('show');
            }
        }
    }
  }

});
