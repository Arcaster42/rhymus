const puzzles = window.puzzlesArray

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         let temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }

// shuffleArray(puzzles)

//Attempting to randomize cards with shuffleArray function

//total number of wrong guesses
let incorrectGuesses = 0
let timeRemaining = 5


//HTML elements
const cardBlock = document.getElementById('rhyme_card')
const countElement = document.getElementById('rhyme_count')
const rhymeElement = document.getElementById('rhyme')
const guessElement = document.getElementById('rhyme_guess')
const wrongElement = document.getElementById('incorrect')
const hint = document.getElementById('hint')
const timerDisplay = document.getElementById('timer')

class RhymusGame {
    constructor() {
        this.currentCard = undefined
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

console.log(puzzles)

const countDown = () => {
    timeRemaining === 0 ? incorrectAnswer() :
        (timerDisplay.textContent = timeRemaining--)
}

// Created timer variable in outer scope so that resetTimer is always clearing the same timer interval that was created. 
// This prevents intervals from stacking on top of each other.
// It's initialized as null so that the interval doesn't start before resetTimer is invoked inside updateDisplay.
let timer = null
const resetTimer = () => {
    clearInterval(timer)
    timer = setInterval(countDown, 1000)
}


const updateDisplay = () => {
    console.log(puzzles)
    resetTimer()
    countElement.textContent = `${Game.currentCard.id}/${puzzles.length}`
    rhymeElement.textContent = Game.currentCard.sentence
    guessElement.value = ''
    hint.textContent = ''
    wrongElement.textContent = ''
    incorrectGuesses = 0
    //resetting time between cards
    timeRemaining = 5
}

const checkAnswer = () => {
    if (guessElement.value === Game.currentCard.answer) {
        correctAnswer()
    } else if (guessElement.value === '' || undefined) {
        alert('Please enter a guess!')
    } else {
        incorrectAnswer()
    }
}

const correctAnswer = () => {
    cardBlock.className += ' correct'
    countElement.className += ' correct'
    guessElement.className += 'correct'

    setTimeout(() => {
        cardBlock.className = 'rhyme_card'
        countElement.className = 'rhyme_count'
        guessElement.className = ''
        if (Game.currentCard.id < puzzles.length) {
            loadCard(puzzles[Game.currentCard.id])
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
    countElement.className += ' incorrect'
    guessElement.className += 'incorrect'
    incorrectGuesses++
    timer.textContent = timeRemaining
    timeRemaining = 5

    setTimeout(() => {
        cardBlock.className = 'rhyme_card'
        countElement.className = 'rhyme_count'
        guessElement.className = ''
    }, 500)
    wrongElement.textContent = 'Wrong Guesses: ' + incorrectGuesses
    //if there are more than 4 incorrect guesses on a single card the player loses
    if (incorrectGuesses > 2 && incorrectGuesses < 4) {
        hint.textContent = 'Hint: ' + capitalizeFirstLetter()
    } else {
        gameOver()
    }

}

const gameOver = () => {
    if (incorrectGuesses > 4) {
        rhymeElement.textContent = 'Game Over!'
        guessElement.removeEventListener("keydown", assignListeners)

        setTimeout(() => {
            cardBlock.className = 'rhyme_card'
            countElement.className = 'rhyme_count'
            guessElement.className = ''
        }, 3000)
        restartGame()
    }
}

const restartGame = () => {
    setTimeout(() => {
        guessElement.addEventListener("keydown", assignListeners)
        loadCard(puzzles[0])
    }, 1500)



}



const Game = new RhymusGame()
//assignListeners()

loadCard(puzzles[0])
