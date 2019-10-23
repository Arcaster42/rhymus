const rhyme = require('rhyme-plus')
const dictFile = __dirname + '/../../cmudict.0.7a'

exports.doRhyme = (word1, word2) => {
  return new Promise((resolve, reject) => {
    rhyme((r) => {
      rhyme1 = r.pronounce(word1)
      rhyme2 = r.pronounce(word2)

      if (!rhyme1 || !rhyme2 || (rhyme1 === rhyme2)) {
        reject(new Error(`Pronunciation of ${word1} or ${word2} cannot be found`))
      }

      let xs = rhyme1.reduce((acc, w) => {
        acc[active(w)] = true
        return acc
      }, {})

      let foundRhyme = rhyme2.some(p => xs[active(p)])

      if (foundRhyme) {
        resolve(foundRhyme)
      } else {
        reject(new Error(`${word1} and ${word2} do not rhyme`))
      }
    }, dictFile)
  })
}

function active(ws) {
  for (
    var i = ws.length - 1;
    i > 0 && ws[i].match(/^[^AEIOU]/i);
    i--
  );
  return ws.slice(i).join(' ');
}
