const puzzles = window.puzzlesArray

//total number of wrong guesses
let incorrectGuesses = 0


//HTML elements
const cardBlock = document.getElementById('rhyme_card')
const countElement = document.getElementById('rhyme_count')
const rhymeElement = document.getElementById('rhyme')
const guessElement = document.getElementById('rhyme_guess')
const wrongElement = document.getElementById('incorrect')
const hint = document.getElementById('hint')

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

const updateDisplay = () => {
    countElement.textContent = `${Game.currentCard.id}/${puzzles.length}`
    rhymeElement.textContent = Game.currentCard.sentence
    guessElement.value = ''
    hint.textContent = ''
    wrongElement.textContent = ''
    incorrectGuesses = 0
}

const checkAnswer = () => {
    if (guessElement.value === Game.currentCard.answer) {
        correctAnswer()
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
    }
    setTimeout(() => {
        cardBlock.className = 'rhyme_card'
        countElement.className = 'rhyme_count'
        guessElement.className = ''
    }, 2000)


}

const Game = new RhymusGame()
//assignListeners()

loadCard(puzzles[0])
