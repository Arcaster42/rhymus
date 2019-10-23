const mocha = require('mocha')
const chai = require('chai')
global.expect = require('chai').expect
// const should = chai.should()
const helpers = require('./helpers')

const puzzlesArray = require('../src/js/puzzles')

function active (ws) {
    // active rhyming region: slice off the leading consonants
    for (
        var i = 0;
        i < ws.length && ws[i].match(/^[^AEIOU]/i);
        i++
    );
    return ws.slice(i).join(' ');
}

describe('Rhymus Test Suite', () => {
    describe('Puzzles Tests', () => {
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

        it('should have properties with the correct types', () => {
            puzzlesArray.forEach((e) => {
                expect(typeof e.id).to.equal('number')
                expect(typeof e.sentence).to.equal('string')
                expect(typeof e.word).to.equal('string')
                expect(typeof e.hint).to.equal('string')
                expect(typeof e.answer).to.eql('string')
            })
        })
        describe('Words and answers rhyme', () => {
            puzzlesArray.forEach((e) => {
                it(`${e.id}: puzzle word (${e.word}) should be 1 word`, () => {
                    expect(e.word.split(' ').length).to.equal(1)
                })
                it(`${e.id}: puzzle answer (${e.answer}) should be 1 word`, () => {
                    expect(e.answer.split(' ').length).to.equal(1)
                })
                it(`${e.id}: ${e.word} & ${e.answer} should rhyme`, done => {
                    helpers.doRhyme(e.word, e.answer).then((result) => {
                        expect(result).to.be.true
                        done()
                    }).catch(r => {
                        done(r)
                    })
                })
            })
        })
    })

    describe('Game Logic Tests', () => {
        it('should be tested in spec.html in browser', () => {
            expect(1).to.equal(1)
        })
    })
})
