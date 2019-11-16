'use strict'
const expect = chai.expect;

describe('Game Function Tests', function(){


    it('should contain a RhymusGame class', () => {
        expect(typeof RhymusGame).to.equal('function')
        const Game = new RhymusGame()
        expect(typeof Game).to.equal('object')
        expect(this.currentCard).to.equal(undefined)
        expect(restartButton.disabled).to.equal(true)
        expect(rhymeElement.textContent).to.equal('Press start to play!')
    })
    it('should have an assignListeners function', () => {
        expect(typeof assignListeners).to.equal('function')
    })
    it('should have an updateDisplay function', () => {
        expect(typeof updateDisplay).to.equal('function')
    })
    it('should have a capitalizeFirstLetter function', () =>{
        expect(typeof capitalizeFirstLetter).to.equal('function')
    })
    it('should have a checkAnswer function', () => {
        expect(typeof checkAnswer).to.equal('function')
    })
    it('should have a correctAnswer function', () => {
        expect(typeof correctAnswer).to.equal('function')
    })
    it('should have an incorrectAnswer function', () => {
        expect(typeof incorrectAnswer).to.equal('function')
    })
    it('should have a gameOver function', () => {
        expect(typeof gameOver).to.equal('function')
    })
    it('should have a restartGame function', () => {
        expect(typeof restartGame).to.equal('function')
    })
    it('should have a countDown function', () => {
        expect(typeof countDown).to.equal('function')
    })
    it('should have a resetTimer function', () => {
        expect(typeof resetTimer).to.equal('function')
    })
    it('should have a gettimerString function', () => {
        expect(typeof getTimerString).to.equal('function')
    })
    it('should have a startGame function', () => {
        expect(typeof startGame).to.equal('function')
    })
    it('should have a shufflePuzzles function', () => {
        expect(typeof shufflePuzzles).to.equal('function')
    })

})
describe('Game logic', function(){
      // Allows for tests to take up to 10 seconds to complete without triggering an error
      this.timeout(10000)

      it('puzzle order should be random', () => {
        shufflePuzzles(puzzlesArray)
        expect(puzzlesArray[0].id).to.not.equal(1)
    })

    it('puzzle order should be reshuffled when startGame runs', ()=> {
        const currentFirstId = puzzlesArray[0].id
        startGame()
        expect(puzzlesArray[0].id).to.not.equal(currentFirstId)
    })

    it('puzzle order should stay the same when restartGame runs', ()=> {
        const currentFirstId = puzzlesArray[0].id
        restartGame()
        expect(puzzlesArray[0].id).to.equal(currentFirstId)
    })

    it('timer should start at 30 seconds', () => {
        expect(playTimeSeconds).to.equal(30)
    })

    it('timer should count down', function(done){
        getTimerString(timeRemaining)
        setTimeout(function(){
           expect(timeRemaining).to.equal(25)
            done()
        },5000)
    })

    it('should have necessary elements set as constants', () => {
        expect(cardBlock).to.not.be.undefined
        expect(countElement).to.not.be.undefined
        expect(rhymeElement).to.not.be.undefined
        expect(guessElement).to.not.be.undefined
        
    })
    it('should have the following html elements', () => {
        expect(timerDisplay).to.not.be.undefined
        expect(startButton).to.not.be.undefined
        expect(restartButton).to.not.be.undefined
        expect(guessElement).to.not.be.undefined
        expect(countElement).to.not.be.undefined
    })

    it('correctGuesses, totalCorrect and totalWrong should be 0 at start', ()=> {
        expect(correctGuesses).to.equal(0)
        expect(totalCorrect).to.equal(0)
        expect(totalWrong).to.equal(0)
    })

    it('card number should start at 1', () => {
        expect(cardNumber).to.equal(1)
    })
})    
