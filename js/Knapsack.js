var capacity;
var items;
var kTable;
var correctCount;
var profit;
var weight;
var generatedExercise;

// generates a random exercise
function generateExercise()
{
  items = Math.floor(Math.random() * 5) + 3;
  capacity = Math.floor(Math.random() * 5) + 5;
  generatedExercise = true;
  var theader = '<table class = "tableItems table table-bordered "> <thead> <tr><th class="bg-primary text-light font-weight-bold" scope="col">Items</th> <th class="bg-primary text-light font-weight-bold" scope="col">Profit</th> <th class="bg-primary text-light font-weight-bold" scope="col">Weight</th> </tr> </thead>';
  var capacityField = document.getElementById("capacity");
  capacityField.placeholder = "" + capacity;
  var itemField = document.getElementById("items");
  itemField.placeholder = "" + items;
  var tbody = '<tbody id="tbody">';
  for (var i = 0; i < items; i++)
  {
    tbody += '<tr> <td class="bg-primary text-light font-weight-bold"> Item ' + i + " </td>";
    randWeight = Math.floor(Math.random() * (capacity - 2)) + 1;
    randValue = Math.floor(Math.random() * randWeight * 2) + 1;
    tbody += '<td> ' + randValue + ' </td>';
    tbody += '<td> ' + randWeight + ' </td>';
    tbody += '</tr>\n';
  }
  tbody += '</tbody> </table>';
  document.getElementById('table_div').innerHTML = theader + tbody;
  generateAnotherTable();
  profit = [];
  weight = [];
  var tableId = document.getElementById("tbody");
  for (var i = 0; i < items; i++)
  {
      pValue = parseInt(tableId.rows[i].cells[1].innerHTML);
      profit.push(pValue);
      wValue = parseInt(tableId.rows[i].cells[2].innerHTML);
      weight.push(wValue);
  }
}

function generateTable()
{
  generatedExercise = false;
  capacity = parseInt(document.getElementById('capacity').value);
  items = parseInt(document.getElementById('items').value);
  var theader = '<table class = "tableItems table table-bordered "> <thead class="bg-primary text-light"> <tr><th scope="col">Items</th> <th scope="col">Profit</th> <th scope="col">Weight</th> </tr> </thead>';
  var tbody = '<tbody id="tbody">';
  for (var i = 0; i < items; i++)
  {
    tbody += '<tr> <td  class="bg-primary text-light font-weight-bold"> Item ' + i + " </td>";
    for (var j = 0; j < 2; j++)
      tbody += '<td> <input type="number" class="form" placeholder="Value"/> </td>';
    tbody += '</tr>\n';
  }
  tbody += '</tbody> </table>';
  var button = '<button type="button" class="btn btn-primary" onclick="generateAnotherTable()">Post the problem</button>'
  document.getElementById('table_div').innerHTML = theader + tbody + button;
}

function generateAnotherTable()
{
  var theader = '<table class = "itemi table table-bordered" id="ne znam"> <thead class="bg-primary text-light"> <tr> <th scope="col"></th>';
  correctCount = 0;
  for (var i = 0; i <= capacity; i++)
      theader += '<th scope="col"> ' + i + ' </th> ';
  theader += '</tr> </thead>';
  var tbody = '<tbody id="solution">';
  for (var i = 0; i <= items; i++)
  {
    tbody += '<tr> <td class="bg-primary text-light font-weight-bold"> <p>{';
    for (var j = 0; j <= i; j++)
      if(j == 1)
        tbody += ' 1';
      else
        if(j > 1)
          tbody += ', ' + j;
    tbody += ' } </p></td>';
    for (var j = 0; j <= capacity; j++)
      tbody += '<td> <input type="number" class="form" placeholder="Value"/> </td>';
    tbody += '</tr>\n';
  }
  tbody += '</tbody> </table>';
  var button = '<button type="button" class="btn btn-primary" onclick="checkSolution()">Submit</button>'
  document.getElementById('inputSolutionTable').innerHTML = theader + tbody + button;
}

function checkSolution()
{
  generateResult();
  var table = document.getElementById("solution");
  for (var i = 0; i <= items; i++)
    for (var j = 1; j <= (capacity + 1); j++)
    {
      var cellValue = table.rows[i].cells[j].children[0].value;
      if(cellValue != "")
      {
        cellValue = parseInt(cellValue);
        if(cellValue != kTable[i][j - 1])
          table.rows[i].cells[j ].children[0].value = "";
        else
          {
            table.rows[i].cells[j].innerHTML = "<p> " + cellValue + "</p>";
            correctCount++;
          }
      }
    }
    console.log(correctCount);
    console.log((items + 1) * (capacity + 1));
    if(correctCount == (items + 1) * (capacity + 1))
      {  document.getElementById('modalTitle').innerHTML='Congratulations!';
        document.getElementById('modalBody').innerHTML='End of the game!';
        $("#alertModal").modal('show');
      }
}

function generateResult()
{

    if(!generatedExercise)
    {
      kProfit = 0;
      profit = [];
      weight = [];
      var tableId = document.getElementById("tbody");
      for (var i = 0; i < items; i++)
      {
          pValue = parseInt(tableId.rows[i].cells[1].children[0].value);
          profit.push(pValue)
          wValue = parseInt(tableId.rows[i].cells[2].children[0].value);
          weight.push(wValue)
      }
    }
    knapsackAlgorithm();
}

function knapsackAlgorithm()
{
    kTable = new Array(items)
    for (var i = 0; i <= items; i++)
    {
        kTable[i] = Array(capacity + 1)
        for (var j = 0; j <= capacity; j++)
            kTable[i][j] = 0;
    }
    for (var i = 1; i <= items; i++)
        for (var j = 0; j <= capacity; j++)
            if (weight[i - 1] <= j)
                kTable[i][j] = (Math.max(kTable[i - 1][j], kTable[i - 1][j - weight[i - 1]] + profit[i - 1]));
            else
                kTable[i][j] = kTable[i - 1][j];
}

function generateItemsSelection()
{
  var itemsSelection = "<form> "
  for (var i = 0; i < items; i++)
  {
    itemsSelection += '<input type="checkbox" id="item' + i + '" name="item' + i + '"> <label for="item' + i + '"> Item' + i + '</label> ';
  }
  itemsSelection += '</form> <button>Check</button>';
  console.log(itemsSelection);
  var itemsSelectionDiv = document.getElementById("itemsSelection");
  itemsSelectionDiv.innerHTML = itemsSelection;
}
