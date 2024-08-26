const userChoiceElem = document.getElementById('user-choice');
const pcChoiceElem = document.getElementById('pc-choice');
const pcPickedDiv = document.querySelector('.pc-picked');
const userPickedDiv = document.querySelector('.user-picked');
const resultMessageElem = document.querySelector('.result-message');
const resultContainer = document.querySelector('.result');
const gamePlayElem = document.querySelector('.game-play');
const playAgainBtns = document.querySelectorAll('.play-again');
const nextBtn = document.querySelector('.next-btn');
const rulesBtn = document.querySelector('.rules-btn');
// Sample choices array
const choices = ['rock', 'paper', 'scissor'];
let hasMadeSelection = false; // Flag to track if a selection has been made

// Function to get the computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the game result
function determineWinner(userChoice, pcChoice) {
    if (userChoice === pcChoice) {
        return "TIE UP";
    } else if (
        (userChoice === 'rock' && pcChoice === 'scissor') ||
        (userChoice === 'scissor' && pcChoice === 'paper') ||
        (userChoice === 'paper' && pcChoice === 'rock')
    ) {
        return "YOU WIN";
    } else {
        return "YOU LOST"; 
    }
}

// Function to apply the border based on choice
function applyBorder(choiceElem, choice) {
    choiceElem.classList.remove('rock-border', 'paper-border', 'scissor-border');
    if (choice === 'rock') {
        choiceElem.classList.add('rock-border');
    } else if (choice === 'paper') {
        choiceElem.classList.add('paper-border');
    } else if (choice === 'scissor') {
        choiceElem.classList.add('scissor-border');
    }
}

// Function to display the choices
function displayChoices(userChoice, pcChoice) {
    document.getElementById('user-img').src = `./images/${userChoice}.svg`;
    document.getElementById('user-img').alt = `${userChoice}`;

    document.getElementById('pc-img').src = `./images/${pcChoice}.svg`;
    document.getElementById('pc-img').alt = `${pcChoice}`;

    applyBorder(userChoiceElem, userChoice);
    applyBorder(pcChoiceElem, pcChoice);


}

function triggerRippleEffect(element) {
    const rippleContainer = element.querySelector('.animation');

    // Clear previous ripples
    rippleContainer.innerHTML = '';

    // Create the 3 concentric circles
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        rippleContainer.appendChild(circle);
    }

    // Trigger the animation
    const circles = rippleContainer.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.style.animationDelay = `${index * 0.3}s`; // Add delay for ripple effect
        circle.style.opacity = '1';
    });
}

function playGame(userChoice) {
    if (hasMadeSelection) return; // Prevent re-selection if already selected

    // Clear any existing ripple effects before starting a new round
    clearRippleEffects();

    const pcChoice = getComputerChoice();
    displayChoices(userChoice, pcChoice);
    const resultMessage = determineWinner(userChoice, pcChoice);
    resultMessageElem.textContent = resultMessage;

    // Show the result screen
    gamePlayElem.style.display = 'none';
    resultContainer.style.display = 'flex';

    document.querySelector('.against').innerHTML = 'AGAINST PC';
    playAgainBtns.innerHTML = 'PLAY AGAIN';

    if (resultMessage === 'YOU WIN') {
        triggerRippleEffect(userPickedDiv); // Trigger ripple for user's choice
        // Show and position buttons
        nextBtn.style.display = 'block';
        
        rulesBtn.style.order = 1; // Move "Rules" to the left
        nextBtn.style.order = 2;
    } else if (resultMessage === 'YOU LOST') {
        
        triggerRippleEffect(pcPickedDiv); // Trigger ripple for PC's choice
    } else if (resultMessage === 'TIE UP') {
        document.querySelector('.against').innerHTML = '';
        playAgainBtns.innerHTML = 'REPLAY';
    }

    hasMadeSelection = true; // Mark that a selection has been made
    updateScores(resultMessage);
}


// Function to clear ripple effects
function clearRippleEffects() {
    const rippleContainers = document.querySelectorAll('.animation');
    rippleContainers.forEach(container => {
        container.innerHTML = ''; // Clear any existing circles
    });
}


function handlePlayAgain() {
    nextBtn.style.display = 'none';
    rulesBtn.style.order = 2;
    resultContainer.style.display = 'none';
    gamePlayElem.style.display = 'block';
    hasMadeSelection = false; // Reset the selection flag
    clearRippleEffects(); // Clear any lingering ripple effects
}

// Event listeners for the "Play Again" buttons
playAgainBtns.forEach(btn => {
    btn.addEventListener('click', handlePlayAgain);
});

nextBtn.addEventListener('click', function() {
    window.location.href = 'celebration.html'; // Redirect to the celebration page
});


// Trigger the game based on user input
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const userChoice = item.classList.contains('rock') ? 'rock' :
                           item.classList.contains('scissor') ? 'scissor' : 'paper';
        playGame(userChoice);
    });
});

// Event listener for the rules section
document.addEventListener('DOMContentLoaded', () => {
    const rulesBtn = document.querySelector('.rules-btn');
    const rulesList = document.querySelector('.rules-list');
    const closeBtn = document.getElementById('rules-close-button');
    
    rulesBtn.addEventListener('click', () => {
        rulesList.style.display = 'block'; // Show rules list
    });

    closeBtn.addEventListener('click', () => {
        rulesList.style.display = 'none'; // Hide rules list
    });
});


let userScore = 0;
let pcScore = 0;

function updateScores(result) {
    if (result === 'YOU WIN') {
        userScore++;
        console.log("user-score", userScore);
        document.querySelector('.score-2 .score-value').textContent = userScore;
    } else if (result === 'YOU LOST') {
        pcScore++;
        console.log("pc-score", pcScore);
        document.querySelector('.score-1 .score-value').textContent = pcScore;

    }

    saveScores(); // Save scores to localStorage
}

function saveScores() {
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('pcScore', pcScore);
}

function loadScores() {
    userScore = parseInt(localStorage.getItem('userScore')) || 0;
    pcScore = parseInt(localStorage.getItem('pcScore')) || 0;

    document.querySelector('.score-2 .score-value').textContent = userScore;
    document.querySelector('.score-1 .score-value').textContent = pcScore;
}

function resetScores() {
    localStorage.removeItem('userScore');
    localStorage.removeItem('pcScore');
}

document.addEventListener('DOMContentLoaded', () => {
    loadScores();
    // Add any other initialization code here
});


