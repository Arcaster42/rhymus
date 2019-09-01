const puzzles = window.puzzlesArray

//total number of wrong guesses
let numOfincorrectanswers = 0

//HTML elements
const cardBlock = document.getElementById('rhyme_card')
const countElement = document.getElementById('rhyme_count')
const rhymeElement = document.getElementById('rhyme')
const guessElement = document.getElementById('rhyme_guess')

class RhymusGame {
    constructor() {
        this.currentCard = undefined
    }
}

const assignListeners = () => {
    guessElement.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') checkAnswer()
    })
}

const loadCard = (nextCard) => {
    Game.currentCard = nextCard
    updateDisplay()
}

const updateDisplay = () => {
    countElement.textContent = `${Game.currentCard.id}/${puzzles.length}`
    rhymeElement.textContent = Game.currentCard.sentence
    guessElement.value = ''
}

const checkAnswer = () => {
    if (guessElement.value === Game.currentCard.answer)
        correctAnswer()
    else incorrectAnswer()
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
        else gameOver()
    }, 800)
}

const incorrectAnswer = () => {

    cardBlock.className += ' incorrect'
    countElement.className += ' incorrect'
    guessElement.className += 'incorrect'
    numOfincorrectanswers++


    setTimeout(() => {
        cardBlock.className = 'rhyme_card'
        countElement.className = 'rhyme_count'
        guessElement.className = ''
    }, 500)
    const wronganswers = document.getElementById('incorrect')
    console.log(Game.currentCard.hint)
    wronganswers.textContent = 'Number of incorrect: ' + numOfincorrectanswers
    if (numOfincorrectanswers >= 2) {
        const hint = document.getElementById('hint')
        hint.textContent = 'hint: ' + Game.currentCard.hint
    }
}

const gameOver = () => {

}

const Game = new RhymusGame()
assignListeners()
loadCard(puzzles[0])