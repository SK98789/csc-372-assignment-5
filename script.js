/*
  Name: Sadie Korzekwa
  Date: 10.03.2025
  CSC 372-01

  This is the script for the rock-paper-scissors page. It holds 
  all the functionality for the game, including animating the computer's
  "thinking", generating the result of the game, and tracking the statistics
  over several games.
*/


const player_choices = document.querySelectorAll("#player-throw img");
const cpuImage = document.querySelector("#computer-throw img");
let choice_selected = false;
let playerChoice;
const image_choices = ["rock.PNG", "paper.PNG", "scissors.PNG"];
let animation;
const results = document.querySelector("#res-display");
const button = document.querySelector("#play-button");
const  winCount = document.querySelector("#stats-wins");
const  tieCount = document.querySelector("#stats-ties");
const  lossCount = document.querySelector("#stats-losses");
const statsButton = document.querySelector("#stats-button");

/**resets values to original settings */
button.addEventListener('click', () => {
    cpuImage.src = "images/question-mark.PNG";
    cpuImage.classList.replace("computer-selected", "not-selected");
    player_choices[playerChoice].classList.replace("player-selected", "not-selected");
    results.textContent = "";
    choice_selected = false;
})

statsButton.addEventListener('click', refreshStats);


player_choices.forEach( choice => {
    choice.addEventListener('click', selectChoice);
});

/** show the selection and start the computer animation  */
function selectChoice(event){
    if(!choice_selected){
        choice_selected = true;
        const image = event.currentTarget;
        image.classList.replace("not-selected", "player-selected");
        startComputerTurn();
    }
}
/** start animation of the computer "thinking" */
function startComputerTurn(){
    animation = setTimeout(changeLoadingImage, 500, 0);
}

/** recursively call the timeout function to animate the images, then generate the random result */
function changeLoadingImage(counter){
    if(counter < 6){
        cpuImage.src = "images/" + image_choices[counter%3];
        counter++;
        animation = setTimeout(changeLoadingImage, 500, counter);
    }
    else{
        clearTimeout(animation);
        const randomNum =  Math.floor(Math.random()*3);
        cpuImage.src ="images/" + image_choices[randomNum];
        cpuImage.classList.replace("not-selected", "computer-selected");
        calculateWinner(randomNum);
    }
}

/**
 * Determines the match winner and updates the results and statistics
 * @param {int} cpuAnswer - the random move that the computer makes
 */
function calculateWinner(cpuAnswer){
    for(let i = 0; i < player_choices.length; i++){
        if(player_choices[i].classList.contains("player-selected")){
            playerChoice = i;
        }
    }

    if(playerChoice === cpuAnswer){
        results.textContent = "Tie!";
        tieCount.textContent = (parseInt(tieCount.textContent)+1);
    }
    else if(playerChoice> cpuAnswer){
        if(playerChoice === 2 && cpuAnswer === 0){
            results.textContent = "You Lose!";
             lossCount.textContent = (parseInt(lossCount.textContent)+1);
        }
        else{
            results.textContent = "You Win!";
            winCount.textContent = (parseInt(winCount.textContent)+1);
        }
    }
    else{
         if(playerChoice === 0 && cpuAnswer === 2){
            results.textContent = "You Win!";
            winCount.textContent = (parseInt(winCount.textContent)+1);
        }
        else{
            results.textContent = "You Lose!";
            lossCount.textContent = (parseInt(lossCount.textContent)+1);
        }
    }
}

/** resets the wins, ties, and losses counters */
function refreshStats(){
    winCount.textContent = 0;
    tieCount.textContent = 0;
    lossCount.textContent = 0;
}
