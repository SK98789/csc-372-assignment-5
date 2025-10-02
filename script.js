
var player_choices = document.querySelectorAll("#player_throw img");
var cpuImage = document.querySelector("#computer_throw img");
var choice_selected = false;
var playerChoice;
var image_choices = ["rock.png", "paper.png", "scissors.png"];
var animation;
var results = document.querySelector("#res_display");
var button = document.querySelector("button");
var  winCount = document.querySelector("#stats_wins");
var  tieCount = document.querySelector("#stats_ties");
var  lossCount = document.querySelector("#stats_losses");


button.addEventListener('click', () => {
    cpuImage.src = "images/question-mark.png";
    cpuImage.classList.replace("computer_selected", "not_selected");
    player_choices[playerChoice].classList.replace("player_selected", "not_selected");
    results.textContent = "";
    choice_selected = false;

})

player_choices.forEach( choice => {
    choice.addEventListener('click', selectChoice);
});
console.log(winCount);
function selectChoice(event){
    if(!choice_selected){
        choice_selected = true;
        const image = event.currentTarget;
        image.classList.replace("not_selected", "player_selected");
        startComputerTurn();
    }
}

function startComputerTurn(){
    animation = setTimeout(changeLoadingImage, 500, 0);
}

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
        cpuImage.classList.replace("not_selected", "computer_selected");
        calculateWinner(randomNum);
    }
}

function calculateWinner(cpuAnswer){
    for(let i = 0; i < player_choices.length; i++){
        if(player_choices[i].classList.contains("player_selected")){
            playerChoice = i;
        }
    }

    if(playerChoice === cpuAnswer){
        results.textContent = "Tie!";
        tieCount.textContent = (Num(tieCount.textContent)+1) + "";
    }
    else if(playerChoice> cpuAnswer){
        if(playerChoice === 2 && cpuAnswer === 0){
            results.textContent = "You Lose!";
             lossCount.textContent = (Num(lossCount.textContent)+1).toString;
            

        }
        else{
            results.textContent = "You Win!";
            winCount.textContent = (Num(winCount.textContent)+1).toString;
        }
    }
    else{
         if(playerChoice === 0 && cpuAnswer === 2){
            results.textContent = "You Win!";
            winCount.textContent = (Num(winCount.textContent)+1).toString;
        }
        else{
            results.textContent = "You Lose!";
            lossCount.textContent = (Num(lossCount.textContent)+1).toString;
        }

    }



}
