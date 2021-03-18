var s1;
var s2;
var lcsTable;
var scsTable;
var gameMode = 0;
var arrowSrc = ["../images/arrow-l.png", "../images/arrow-u.png", "../images/arrow-d.png", "../images/x.png"];
var correctCount;

function generateTable()
{
  s1 = document.getElementById('s1').value;
  s2 = document.getElementById('s2').value
  correctCount = 0;
  var theader = '<table class = "" id=""> <thead> <tr> <th scope="col"></th> <th scope="col"></th>';
  for (var i = 0; i < s1.length; i++)
      theader += '<th scope="col"> ' + s1.charAt(i) + ' </th> ';
  theader += '</tr> </thead>';
  var tbody = '<tbody id="solution">';
  for (var i = 0; i <= s2.length; i++)
  {
    if(i != 0)
      tbody += '<tr> <td> ' + s2.charAt(i - 1) + ' </td>';
    else
      tbody += '<tr> <td> </td>';
    for (var j = 0; j <= s1.length; j++)
      if(i == 0 || j == 0)
        tbody += '<td> <input type="texr" class="form" placeholder="Value"/> </td>';
      else
        tbody += '<td> <input type="texr" class="form" placeholder="Value"/> <img class="arrow" src="../images/arrow-l.png" alt="" onclick="swapArrow(this)"> </td>';
    tbody += '</tr>\n';
  }
  tbody += '</tbody> </table>';
  var button;
  if(gameMode == 0)
    button = '<button type="button" onclick="checkSolution(lcsTable)">Submit</button>';
  else
    button = '<button type="button" onclick="checkSolution(scsTable)">Submit</button>';
  document.getElementById('inputSolutionTable').innerHTML = theader + tbody + button;
  lcs();
  scs();
}

function imageIndex(image)
{
  var index;
  switch (image.src.slice(-5, -4))
  {
    case "l":
      index = 0;
      break;
    case "u":
      index = 1;
      break;
    case "d":
      index = 2;
      break;
    case "x":
      index = 5;
      break;
    default:
  }
  return index;
}

function swapArrow(image)
{
  var i = imageIndex(image);
  i = (i + 1) % 3;
  image.src = arrowSrc[i];
}

function checkSolution(arr)
{
  var table = document.getElementById("solution");
  for (var i = 0; i < arr.length; i++)
    for (var j = 1; j <= arr[i].length; j++)
    {
        var cellValue = table.rows[i].cells[j].children[0].value;
        if(cellValue != "")
        {
          cellValue = parseInt(cellValue);
          if(cellValue != arr[i][j - 1])
            table.rows[i].cells[j ].children[0].value = "";
          else
          {
            table.rows[i].cells[j].removeChild(table.rows[i].cells[j].children[0]);
            var str = "<p> " + cellValue + " </p>";
            table.rows[i].cells[j].innerHTML = str.concat(table.rows[i].cells[j].innerHTML);
            correctCount++;
          }
        }
    }
  var arrowCheck;
  if(gameMode == 0)
    arrowCheck = lcsArrowsCheck();
  else
    arrowCheck = scsArrowsCheck();
  if(arrowCheck && correctCount == arr.length * arr[0].length)
  {
    alert("Use backtracking to find a solution");
    document.getElementById('finalSolution').innerHTML = '<input type="texr" id="solutionString" class="form" placeholder="Value"/> <button type="button" onclick="checkFinalSolution(this);">Submit</button>';
  }
}

function checkFinalSolution(input)
{
  var solution
  if(gameMode == 0)
    solution = computeLCSFinalSolution();
  else
    solution = computeSCSFinalSolution();
  if(solution.localeCompare(document.getElementById("solutionString").value) == 0)
    alert("Game is over");
  else
    alert("Try again");
}

function computeLCSFinalSolution()
{
  var solution = "";
  var i = lcsTable.length - 1;
  var j = lcsTable[0].length - 1;
  var table = document.getElementById("solution");
  while(i!=0 || j!=0)
  {
    if(i == 0)
      j--;
    else
      if(j == 0)
        i--;
      else
      {
          var img = table.rows[i].cells[j + 1].children[1];
          var imgIndex = imageIndex(img);
          switch (imgIndex)
          {
            case 0:
              j--;
            break;
            case 1:
              i--;
            break;
            case 2:
              var addChar = "" + s1.charAt(j - 1);
              solution = addChar.concat(solution);
              i--;
              j--;
            break;
            default:
          }
      }
  }
  return solution;
}

function computeSCSFinalSolution()
{
  var solution = "";
  var i = scsTable.length - 1;
  var j = scsTable[0].length - 1;
  var table = document.getElementById("solution");
  while(i!=0 || j!=0)
  {
    if(i == 0)
      {
        solution = s1.charAt(j - 1) + solution;
        j--;
      }
    else
      if(j == 0)
        {
          solution = s2.charAt(i - 1) + solution;
          i--;
        }
      else
      {
          var img = table.rows[i].cells[j + 1].children[1];
          var imgIndex = imageIndex(img);
          switch (imgIndex)
          {
            case 0:
              solution = s1.charAt(j - 1) + solution;
              j--;
            break;
            case 1:
              solution = s2.charAt(i - 1) + solution;
              i--;
            break;
            case 2:
              solution = s1.charAt(j - 1) + solution;
              i--;
              j--;
            break;
            default:
          }
      }
  }
  return solution;
}

function lcs()
{
    lcsTable = new Array(s2.length + 1);
    lcsArrows = new Array(s2.length + 1);
    for (var i = 0; i <= s2.length; i++)
      {
        lcsTable[i] = new Array(s1.length + 1);
        lcsArrows[i] = new Array(s1.length + 1);
      }
    for (var i = 0; i <= s2.length; i++)
        for (var j = 0; j <= s1.length; j++)
            if (i==0 || j==0)
              lcsTable[i][j] = 0;
            else
              if(s2.charAt(i - 1) == s1.charAt(j - 1))
                lcsTable[i][j] = lcsTable[i-1][j-1] + 1;
              else
                lcsTable[i][j] = Math.max(lcsTable[i-1][j], lcsTable[i][j-1]);
}

function lcsArrowsCheck()
{
  var table = document.getElementById("solution");
  var correct = true;
  for (var i = 1; i < lcsTable.length; i++)
    for (var j = 2; j <= lcsTable[i].length; j++)
    {
      var img = table.rows[i].cells[j].children[1];
      var imgIndex = imageIndex(img);
      if(s2.charAt(i - 1) == s1.charAt(j - 2))
        {
          if(imgIndex != 2)
            {
              img.src = arrowSrc[3];
              correct = false;
            }
        }
      else
        switch (imgIndex)
        {
          case 0:
            if(lcsTable[i][j - 1] != lcsTable[i][j - 2])
            {
              img.src = arrowSrc[3];
              correct = false;
            }
            break;
          case 1:
            if(lcsTable[i][j - 1] != lcsTable[i-1][j - 1])
            {
              img.src = arrowSrc[3];
              correct = false;
            }
            break;
          default:
            correct = false;
            img.src = arrowSrc[3];
        }
    }
    return correct;
}

function scs()
{
  scsTable = new Array(s2.length + 1)
  for (var i = 0; i <= s2.length; i++)
      scsTable[i] = Array(s1.length + 1)
  for(var i = 0; i <= s2.length; i++)
    scsTable[i][0] = i;
  for (var j = 0; j <= s1.length; j++)
    scsTable[0][j] = j;
  for (var i = 1; i <= s2.length; i++)
      for (var j = 1; j <= s1.length; j++)
          if(s2.charAt(i - 1) == s1.charAt(j - 1))
            scsTable[i][j] = scsTable[i-1][j-1] + 1;
          else
            scsTable[i][j] = Math.min(scsTable[i-1][j] + 1, scsTable[i][j-1] + 1);
}

function scsArrowsCheck()
{
  var table = document.getElementById("solution");
  var correct = true;
  for (var i = 1; i < scsTable.length; i++)
    for (var j = 2; j <= scsTable[i].length; j++)
    {
      var img = table.rows[i].cells[j].children[1];
      var imgIndex = imageIndex(img);
      if(s2.charAt(i - 1) == s1.charAt(j - 2))
        {
          if(imgIndex != 2)
            {
              img.src = arrowSrc[3];
              correct = false;
            }
        }
      else
        switch (imgIndex)
        {
          case 0:
            if(scsTable[i][j - 1] != (scsTable[i][j - 2] + 1))
            {
              img.src = arrowSrc[3];
              correct = false;
            }
            break;
          case 1:
            if(scsTable[i][j - 1] != (scsTable[i-1][j - 1] + 1))
            {
              img.src = arrowSrc[3];
              correct = false;
            }
            break;
          default:
            correct = false;
            img.src = arrowSrc[3];
        }
    }
    return correct;
}
