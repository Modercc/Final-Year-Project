var selected;
var goal;
var varGoal;
var d;
var b;
var iteration;
var backtracking;

options.edgeLength = true;
options.multipleEdges = true;
options.drawArrows = true;

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
  alert("Select the starting point");
}

function generateTableHeader()
{
  var theader = '<table id = "table"> <thead> <tr> <th> </th>';
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
  var button = '<button type="button" onclick="checkSolution()">Done</button>';
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
      alert("Backtracking");
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
      tbody += '<td> <input type="texr" class="form" placeholder="Value"/> </td>';
    else
      tbody += '<td> ' + d[i] +  ' </td>'
  tbody += ' </tr>';
  tbody += '<tr> <td> b: </td>';
  for (var i = 0; i < PointsArray.length; i++)
    if(!insideSelected(i))
      tbody += '<td> <input type="texr" class="form" placeholder="Value"/> </td>';
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
            alert("Select the ending point");
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
              alert("End of the game.")
            }
        }
    }
  }

});
