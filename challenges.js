var scores, roundScore, activePlayer, gamePlaying;

init();

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

function nextPlayer() {
    roundScore = 0;
    prevRoll = 0;
    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    document.querySelector(".player-"+activePlayer+'-panel').classList.remove('active');
    activePlayer = 1 - activePlayer;
    document.querySelector(".player-"+activePlayer+'-panel').classList.add('active');
}

document.querySelector(".btn-roll").addEventListener("click",function() {
    
    if(gamePlaying) {
        var dice = Math.floor(Math.random()*6 + 1);
        var dice2 = Math.floor(Math.random()*6 + 1);
        
        var diceDOM = document.getElementById('dice-1');
        diceDOM.style.display='';
        diceDOM.src = 'dice-'+ dice + '.png';
        
        var diceDOM2 = document.getElementById('dice-2');
        diceDOM2.style.display='';
        diceDOM2.src = 'dice-'+ dice2 + '.png';
    
        if(dice > 1 && dice2 > 1) {
                //Add score
                roundScore += dice + dice2;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //next player;
            nextPlayer();
        }
    }
});


document.querySelector(".btn-hold").addEventListener("click",function() {
    if(gamePlaying) {
        //add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //update UI
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if User won
        if(scores[activePlayer]>=winningScore) {
            document.getElementById('name-'+activePlayer).textContent = 'WINNER';
            document.getElementById('dice-1').style.display='none';
            document.getElementById('dice-2').style.display='none';
            document.querySelector(".player-"+activePlayer+'-panel').classList.remove('active');
            document.querySelector(".player-"+activePlayer+'-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener('click',init);
