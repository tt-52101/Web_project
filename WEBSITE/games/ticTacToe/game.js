const cards = document.querySelectorAll(".card");
const possibilitiesToWin = [[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]];
//const possibilitiesForBlock = [[1,2],[2,3],[1,3],[4,5],[5,6],[4,6],[7,8],[8,9],[7,9],[1,4],[4,7],[1,7],[2,5],[5,8],[2,8],[3,6],[6,9],[3,9],[1,5],[5,9],[1,9],[3,5],[5,7],[3,7]];
let cardNumbers = [1,2,3,4,5,6,7,8,9];
let firstPlayer = [], computer = [];
/*******************************************************/
function check(array){
  let finalResult = false;
  for(let item of possibilitiesToWin){
    let res = item.every(val => array.indexOf(val) !== -1);
    if(res){
        finalResult = true;
      break;
    }
  }
  return finalResult;
}
/*******************************************************/
function checkForBlock(){
  let finalResult = -1;
  for(let item of possibilitiesToWin){
    let a = item[0] , b = item[1] , c = item[2];
    if(firstPlayer.includes(a) && firstPlayer.includes(b) && !computer.includes(c)){
      finalResult = c;
      break;
    } else if(firstPlayer.includes(b) && firstPlayer.includes(c) && !computer.includes(a)){
      finalResult = a;
      break;
    } else if(firstPlayer.includes(a) && firstPlayer.includes(c) && !computer.includes(b)){
      finalResult = b;
      break;
    }
  }
  return finalResult;
}
/*******************************************************/
function winnerpleyr(p){
  const modal = document.createElement("div");
  const player = document.createTextNode(p);
  const replay = document.createElement("button");
  modal.classList.add("winner");
  modal.appendChild(player);
  replay.appendChild(document.createTextNode("Replay"));
  replay.setAttribute("onclick","rep()");
  modal.appendChild(replay);
  document.body.appendChild(modal);
}
/*******************************************************/
function draw(){
  if(this.classList == "card"){
    this.classList.add("x");
    let cardIndx = Number(this.dataset.index);
    let arrayIndx = cardNumbers.indexOf(cardIndx);
    cardNumbers.splice(arrayIndx,1);
    firstPlayer.push(cardIndx);
    if(check(firstPlayer)){
      winnerpleyr("congrats, you win");
      return;
    }
    if(cardNumbers.length == 0){
      winnerpleyr("Draw");
      return;
    }
    cardIndx = checkForBlock();
    if(cardIndx !== -1){
      arrayIndx = cardNumbers.indexOf(cardIndx);
      cardNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${cardIndx}"]`);
      computerDraw.classList.add("o");
      computer.push(Number(computerDraw.dataset.index));
    } else{
      let cardNumbersLength = cardNumbers.length;
      let random = Math.floor(Math.random() * cardNumbersLength);
      cardIndx = cardNumbers[random];
      arrayIndx = cardNumbers.indexOf(cardIndx);
      cardNumbers.splice(arrayIndx,1);
      let computerDraw = document.querySelector(`[data-index="${cardIndx}"]`);
      computerDraw.classList.add("o");
      computer.push(Number(computerDraw.dataset.index)); 
    }
    if(check(computer)){
      winnerpleyr("sorry, you lose");
      return;
    }
  }
}
/*******************************************************/
function rep(){
  const w = document.querySelector(".winner");
  cards.forEach(card => card.classList = "card");
  cardNumbers = [1,2,3,4,5,6,7,8,9]
  firstPlayer = [];
  computer = [];
  w.remove();
}
/*******************************************************/
cards.forEach(card => card.addEventListener("click", draw));
