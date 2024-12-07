cells=document.querySelectorAll(".cell")
statusText=document.querySelector(".statusText")
restartBtn=document.querySelector(".restartBtn")
winningstatusText=document.querySelector(".winningstatusText")
winningConditions=[
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]; //these are the winning conditions
var options=["","","","","","","","",""]  //these are to update/view the grid in a 1-d array format
let running=false
var currentPlayer="X"
InitialiseGame();
function InitialiseGame()
{
    currentPlayer="X"
    cells.forEach(cell => cell.addEventListener("click",ClickingCell));
    restartBtn.addEventListener("click",RestartGame)
    statusText.textContent=`${currentPlayer}'s turn`
    running=true
}
function ClickingCell()
{
    const cellIndex=this.getAttribute("cellIndex") //to get the cell index of the current cell that called the function
    if(options[cellIndex]!="" || !running) //if the cell is not blank then return and do not update the cell
    {
        return;
    }
    UpdateClick(this,cellIndex);
}
function UpdateClick(cell,cellIndex)
{
    options[cellIndex]=currentPlayer;
    cell.textContent=currentPlayer;
    CheckWinning();
}
function CheckWinning()
{

    var roundWon=false
    for(let i=0;i<winningConditions.length;i++)
    {
        var conditions=winningConditions[i];
        cellA=options[conditions[0]];
        cellB=options[conditions[1]];
        cellC=options[conditions[2]];

        if(cellA=="" || cellB=="" ||cellC=="")
        {
            continue;
        }
        else if(cellA==cellB && cellB==cellC) //3 X's or 3 O's
        {
            roundWon=true;
            break;
        }
    }
    if(roundWon)
    {
        statusText.textContent=`${currentPlayer} is the winner!`;
        running=false;
        endGame();
        return;
    } 
    else if(!options.includes("")) //if grid is filled
    {
        statusText.textContent=`Its a draw!`;
        running=false;
        endGame();
        return;
    }
    else 
    {
        ChangePlayer();
    }
      
    }
   
function ChangePlayer()
{
    currentPlayer=(currentPlayer==="X") ? "O" : "X";
    DisplaystatusText();
}
function DisplaystatusText()
{
    statusText.textContent=`${currentPlayer}'s turn`
}
function RestartGame()
{
    options=["","","","","","","","",""]
    cells.forEach(cell=> cell.textContent="")
    InitialiseGame();  
}
function endGame()
{
    cells.forEach(cell => cell.removeEventListener("click",ClickingCell));//if won or draw stop or end the eventlisteners
}