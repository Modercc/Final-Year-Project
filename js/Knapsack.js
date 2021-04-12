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
  var theader = '<table class = "tableItems table table-bordered "> <thead> <tr><th scope="col">Items</th> <th scope="col">Profit</th> <th scope="col">Weight</th> </tr> </thead>';
  var capacityField = document.getElementById("capacity");
  capacityField.placeholder = "" + capacity;
  var itemField = document.getElementById("items");
  itemField.placeholder = "" + items;
  var tbody = '<tbody id="tbody">';
  for (var i = 0; i < items; i++)
  {
    tbody += '<tr> <td> Item ' + i + " </td>";
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
      pValue = parseInt(tableId.rows[i].cells[1].value);
      profit.push(pValue)
      wValue = parseInt(tableId.rows[i].cells[2].value);
      weight.push(wValue)
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
    if(correctCount == (items + 1) * (capacity + 1))
      {  document.getElementById('modalTitle').innerHTML='Congratulations!';
        document.getElementById('modalBody').innerHTML='End of the game!';
        $("#alertModal").modal('show');}
}

function generateResult()
{
/*
    var resultClass = document.getElementsByClassName("result");
    console.log(resultClass.length);

    for (i = 0; i < resultClass.length; i++) {
        resultClass[i].style.visibility = "visible";
    }
*/

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
    console.log(kTable);
    console.log(kTable[items][capacity]);
/*
    kp01ResultantProfitId.innerHTML = knapsackTable[num_rows][knapsackCapacity]
    kp01ProfitId.innerHTML = profit
    kp01WeightId.innerHTML = weight
*/
}

/*

var kpResultantProfitId = document.getElementById("kpResultantProfit")
var kpProfitId = document.getElementById("kpProfit")
var kpWeightId = document.getElementById("kpWeight")
var kpProfitWeightId = document.getElementById("kpProfitWeight")
var kpResultantSolutionId = document.getElementById("kpResultantSolution")

var kp01ResultantProfitId = document.getElementById("kp01ResultantProfit")
var kp01ProfitId = document.getElementById("kp01Profit")
var kp01WeightId = document.getElementById("kp01Weight")

var weightValue, profitValue
var profit = [];
var weight = [];
var profit_weight = []
var tempList = []
var resultantSolution = []
var i, j, knapsackResultantProfit = 0;

function generateResult() {

    knapsackCapacity = document.getElementById('capacity').value;
    num_rows = document.getElementById('rows').value;

    knapsackResultantProfit = 0;
    profit = [];
    weight = [];
    profit_weight = []
    tempList = []

    var resultClass = document.getElementsByClassName("result");
    console.log(resultClass.length);

    for (i = 0; i < resultClass.length; i++) {
        resultClass[i].style.visibility = "visible";
    }

    var tableId = document.getElementById("table")
    for (var i = 1; i <= num_rows; i++) {
        profitValue = tableId.rows[i].cells[1].children[0].value;
        profit.push(profitValue)
        tempList.push(profitValue)
        weightValue = tableId.rows[i].cells[2].children[0].value;
        weight.push(weightValue)
    }
    knapsack01Algorithm()
    sortLists()

    console.log("profit = " + profit);
    console.log("weight = " + weight);
    console.log("profit/weight = " + profit_weight);
    knapsackAlgorithm()
    console.log(knapsackResultantProfit);

}


function sortLists() {

    // to find profit/weight
    for (i = 0; i < num_rows; i++) {
        profit_weight[i] = (profit[i] / weight[i])
    }
    console.log(tempList);

    // to sort profit/weight in decreasing order along with profit and weight list
    var list = [];
    for (i = 0; i < num_rows; i++)
        list.push({ 'profit_weight': profit_weight[i], 'profit': profit[i], 'weight': weight[i] });


    list.sort(function (a, b) {
        return ((a.profit_weight > b.profit_weight) ? -1 : ((a.profit_weight == b.profit_weight) ? 0 : 1));
    });

    for (i = 0; i < num_rows; i++) {
        profit_weight[i] = +(list[i].profit_weight).toFixed(3)
        profit[i] = list[i].profit;
        weight[i] = list[i].weight;
    }
}

// 9    4   4   2.5     2.5     2   0.625       >profit/weight
// 18   20  12  25      10      22  5           >profit
// 2    5   3   10      4       11  8           >weight
// 23

// 20, 25, 10, 12, 5, 22, 1

// applying knapsack algorithm
function knapsackAlgorithm() {

    for (i = 0; i < num_rows; i++) {
        if (weight[i] <= knapsackCapacity) {
            knapsackCapacity -= weight[i]
            knapsackResultantProfit += +profit[i]
            tempList[tempList.indexOf(profit[i])] = 1
        }
        else if(knapsackCapacity != 0) {
            knapsackResultantProfit = +knapsackResultantProfit + +(profit[i] * (knapsackCapacity / weight[i]))
            tempList[tempList.indexOf(profit[i])] = knapsackCapacity + "/" + weight[i]
            knapsackCapacity = 0
        }
        else {
            tempList[tempList.indexOf(profit[i])] = 0
        }
    }

    kpResultantProfitId.innerHTML = +knapsackResultantProfit.toFixed(3)
    kpProfitId.innerHTML = profit
    kpWeightId.innerHTML = weight
    kpProfitWeightId.innerHTML = profit_weight
    kpResultantSolutionId.innerHTML = tempList
}

// applying knapsack 0/1 algorithm
function knapsack01Algorithm() {
    var knapsackTable = new Array(num_rows)
    for (i = 0; i <= num_rows; i++) {

        knapsackTable[i] = Array(knapsackCapacity)
        for (j = 0; j <= knapsackCapacity; j++) {
            knapsackTable[i][j] = 0
        }
    }

    var theader = '<table class="table table-bordered">';
    var tbody = '';

    for (i = 1; i <= num_rows; i++) {
        for (j = 0; j <= knapsackCapacity; j++) {
            if (weight[i - 1] <= j) {
                knapsackTable[i][j] = (Math.max(knapsackTable[i - 1][j], +knapsackTable[i - 1][j - weight[i - 1]] + +profit[i - 1]));
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
            else {
                knapsackTable[i][j] = knapsackTable[i - 1][j]
                tbody += '<td>';
                tbody += knapsackTable[i][j];
                tbody += '</td>'
            }
        }
        tbody += '</tr></tbody>\n';
    }

    var tfooter = '</table>';
    document.getElementById('knapsackTable').innerHTML = theader + tbody + tfooter;

    console.log(knapsackTable);
    console.log(knapsackTable[num_rows][knapsackCapacity]);


    kp01ResultantProfitId.innerHTML = knapsackTable[num_rows][knapsackCapacity]
    kp01ProfitId.innerHTML = profit
    kp01WeightId.innerHTML = weight

}

*/
