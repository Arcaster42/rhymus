const playTimeSeconds = 30

const shufflePuzzles = (arr1) => {
    let ctr = arr1.length
    let index
    let array
    while(ctr > 0) {
        index = Math.floor(Math.random() * ctr)
        ctr --,
        array = [arr1[index], arr1[ctr]] = [arr1[ctr], arr1[index]]
    }
    return array
}

const puzzles = window.puzzlesArray

// Randomize order of puzzles
shufflePuzzles(puzzles)

//total number of wrong guesses
let incorrectGuesses = 0
let timeRemaining = playTimeSeconds
let cardNumber = 1
let correctGuesses = 0
let totalCorrect = 0
let totalWrong = 0


//HTML elements
const cardBlock = document.getElementById('rhyme_card')
const countElement = document.getElementById('rhyme_count')
const rhymeElement = document.getElementById('rhyme')
const correctElement = document.getElementById('correct')
const incorrectElement = document.getElementById('wrong')
const guessElement = document.getElementById('rhyme_guess')
const wrongElement = document.getElementById('incorrect')
const hint = document.getElementById('hint')
const timerDisplay = document.getElementById('timer')
const startButton = document.querySelector('.header_button_start')
const restartButton = document.querySelector('.header_button_restart')

class RhymusGame {
    constructor() {
        this.currentCard = undefined
        timerDisplay.textContent = getTimerString(timeRemaining)
    }
}

const assignListeners = (e) => {
    if (e.key === 'Enter') checkAnswer()
}
//add event listener
guessElement.addEventListener("keydown", assignListeners)

const loadCard = (nextCard) => {
    Game.currentCard = nextCard
    updateDisplay()
}

const countDown = () => {
    timeRemaining === 0 ? gameOver() :
        (timerDisplay.textContent = getTimerString(timeRemaining--))
}

const getTimerString = (timeRemaining) => {
    return `${timeRemaining.toString().padStart(2, '0')}`
}

// Created timer variable in outer scope so that resetTimer is always clearing the same timer interval that was created.
// This prevents intervals from stacking on top of each other.
// It's initialized as null so that the interval doesn't start before resetTimer is invoked inside updateDisplay.
let timer = null
const resetTimer = () => {
    clearInterval(timer)
    timer = setInterval(countDown, 1000)
    timerDisplay.classList.add('running')
}


const updateDisplay = () => {
    resetTimer()
    countElement.textContent = `${cardNumber} of ${puzzles.length}`
    rhymeElement.textContent = Game.currentCard.sentence
    guessElement.value = ''
    hint.textContent = ''
    wrongElement.textContent = ''
    incorrectGuesses = 0
}

const checkAnswer = () => {
    if (guessElement.value === Game.currentCard.answer) {
        correctAnswer()
        totalCorrect++
    } else if (guessElement.value === '' || undefined) {
        alert('Please enter a guess!')
    } else {
        incorrectAnswer()
        totalWrong++
    }
}

const correctAnswer = () => {
    cardBlock.className += ' correct'
    guessElement.className += 'correct'
    cardNumber ++
    correctGuesses ++
    setTimeout(() => {
        cardBlock.className = 'rhyme_card'
        guessElement.className = ''
        if (cardNumber < puzzles.length) {
            loadCard(puzzles[cardNumber])
        }
        else {
            gameOver()
        }
    }, 800)
}

const capitalizeFirstLetter = () => {
    return Game.currentCard.hint.charAt(0).toUpperCase() + Game.currentCard.hint.slice(1).toLowerCase();
}

const incorrectAnswer = () => {
    cardBlock.className += ' incorrect'
    guessElement.className += 'incorrect'
    incorrectGuesses++
    guessElement.value = ''

    setTimeout(() => {
        cardBlock.className = 'rhyme_card'
        guessElement.className = ''
    }, 500)
    wrongElement.textContent = 'incorrect guesses: ' + incorrectGuesses
    //if there are more than 4 incorrect guesses on a single card the player loses
    if (incorrectGuesses > 2 && incorrectGuesses < 4) {
        hint.style.display = 'flex';
        hint.textContent = 'Hint: ' + capitalizeFirstLetter()
    } else {
        gameOver()
    }

}

const gameOver = () => {
    // Accounts for array starting at 0
    if (timeRemaining === 0 || correctGuesses + 1 === puzzles.length ) {
        timerDisplay.textContent = getTimerString(timeRemaining)
        timerDisplay.classList.remove('running')
        timerDisplay.classList.add('gameover')
        rhymeElement.textContent = 'Game Over!'
        correctElement.textContent = 'Correct guesses: ' + totalCorrect
        incorrectElement.textContent = 'Incorrect guesses: ' + totalWrong
        timerDisplay.style.setProperty('background', 'var(--danger)')
        cardBlock.style.setProperty('background', 'var(--danger)')
        hint.style.display = 'none';
        guessElement.removeEventListener("keydown", assignListeners)
        cardNumber = 1
        correctGuesses = 0
        setTimeout(() => {
            cardBlock.className = 'rhyme_card'
            countElement.className = 'rhyme_count'
            guessElement.className = ''
        }, 3000)
    }
}

const restartGame = () => {
  timeRemaining = playTimeSeconds;
  timerDisplay.classList.remove('gameover')
  timerDisplay.style.setProperty('background', 'var(--primary-gradient)')
  cardBlock.style.setProperty('background', 'var(--primary-gradient)')
  correctElement.textContent = ''
  incorrectElement.textContent = ''
  guessElement.addEventListener('keydown', assignListeners)
  shufflePuzzles(puzzles)
  loadCard(puzzles[0])
  startButton.disabled = true;
  guessElement.focus()
  timerDisplay.textContent = getTimerString(timeRemaining)
};

startButton.addEventListener('click', restartGame)
restartButton.addEventListener('click', restartGame)

const Game = new RhymusGame()
//assignListeners()
// Shuffle cards every time
restartGame()
