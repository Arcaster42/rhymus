const expect = chai.expect;

describe('Game Function Tests', () => {
    it('should contain a RhymusGame class', () => {
        expect(typeof RhymusGame).to.equal('function')
        const Game = new RhymusGame()
        expect(typeof Game).to.equal('object')
    })
    it('should have an assignListeners function', () => {
        expect(typeof assignListeners).to.equal('function')
    })
    it('should have an updateDisplay function', () => {
        expect(typeof updateDisplay).to.equal('function')
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

    it('should have necessary elements set as constants', () => {
        expect(cardBlock).to.not.be.undefined
        expect(countElement).to.not.be.undefined
        expect(rhymeElement).to.not.be.undefined
        expect(guessElement).to.not.be.undefined
    })
})