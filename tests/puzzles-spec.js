const mocha = require('mocha')
const chai = require('chai')
global.expect = require('chai').expect
// const should = chai.should()

const puzzlesArray = require('../src/js/puzzles')

describe('Rhymus Test Suite', () => {
    describe('Puzzles Tests', () => {
        beforeEach(function(){
            shufflePuzzles = (arr1) => {
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
        })
        it('should exists', () => {
            expect(puzzlesArray).to.not.be.null
            expect(puzzlesArray).to.not.be.undefined
        })
        it('should have required properties', () => {
            puzzlesArray.forEach((e) => {
                expect(e.id).to.not.be.undefined
                expect(e.sentence).to.not.be.undefined
                expect(e.word).to.not.be.undefined
                expect(e.hint).to.not.be.undefined
                expect(e.answer).to.not.be.undefined
            })
        })

        it('puzzle order should be random', () => {
            shufflePuzzles(puzzlesArray)
            expect(puzzlesArray[0].id).to.not.equal(1)
        })

        it('should have properties with the correct types', () => {
            puzzlesArray.forEach((e) => {
                expect(typeof e.id).to.equal('number')
                expect(typeof e.sentence).to.equal('string')
                expect(typeof e.word).to.equal('string')
                expect(typeof e.hint).to.equal('string')
                expect(typeof e.answer).to.eql('string')
            })
        })
    })

    describe('Game Logic Tests', () => {
        it('should be tested in spec.html in browser', () => {
            expect(1).to.equal(1)
        })
    })
})