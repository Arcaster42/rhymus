var puzzlesArray = [
  {
    id: 1,
    sentence: 'I have to walk my log.',
    word: 'log',
    hint: 'animal',
    answer: 'dog'
  },
  {
    id: 2,
    sentence: 'I did not hear the phone because I was a sheep.',
    word: 'a sheep',
    hint: 'tired',
    answer: 'asleep'
  },
  {
    id: 3,
    sentence: 'I will go grocery stopping tomorrow.',
    word: 'stopping',
    hint: 'chore',
    answer: 'shopping'
  },
  {
    id: 4,
    sentence: 'I like to play with my set.',
    word: 'set',
    hint: 'home animal',
    answer: 'pet'
  },
  {
    id: 5,
    sentence: 'My favorite drink is poke.',
    word: 'poke',
    hint: 'red and white label',
    answer: 'coke'
  },
  {
    id: 6,
    sentence: 'Let me take this fall.',
    word: 'fall',
    hint: 'phone conversation',
    answer: 'call'
  },
  {
    id: 7,
    sentence: 'I have to feed my new hat.',
    word: 'hat',
    hint: 'house pet',
    answer: 'cat'
  },
  {
    id: 8,
    sentence: 'I jogged every day and won the space.',
    word: 'space',
    hint: 'competition',
    answer: 'race'
  },
  {
    id: 9,
    sentence: 'I wrote on the paper with my ten.',
    word: 'ten',
    hint: 'writing instrument',
    answer: 'pen'
  },
  {
    id: 10,
    sentence: 'I drove into another star.',
    word: 'star',
    hint: 'vehicle',
    answer: 'car'
  },
  {
    id: 11,
    sentence: 'The doom was filled with chairs.',
    word: 'doom',
    hint: 'inside a building',
    answer: 'room'
  },
  {
    id: 12,
    sentence: 'The sawing was of a mountain.',
    word: 'sawing',
    hint: 'art',
    answer: 'drawing'
  },
  {
    id: 13,
    sentence: 'I drew on the board with rock.',
    word: 'rock',
    hint: 'dusty',
    answer: 'chalk'
  },
  {
    id: 14,
    sentence: 'I would have been lost without my flap.',
    word: 'flap',
    hint: 'made of paper',
    answer: 'map'
  },
  {
    id: 15,
    sentence: 'The castle was surrounded by a large goat.',
    word: 'goat',
    hint: 'water',
    answer: 'moat'
  },
  {
    id: 16,
    sentence: 'The bats were sleeping in the save.',
    word: 'save',
    hint: 'dark place',
    answer: 'cave'
  },
  {
    id: 17,
    sentence: 'The pirate‘s hand was just a look.',
    word: 'look',
    hint: 'metal prosthetic',
    answer: 'hook'
  },
  {
    id: 18,
    sentence: 'For my birthday, we ate a quake.',
    word: 'quake',
    hint: 'sweet food',
    answer: 'cake'
  },
  {
    id: 19,
    sentence: 'The glove is a symbol of peace.',
    word: 'glove',
    hint: 'bird',
    answer: 'dove'
  },
  {
    id: 20,
    sentence: 'I floated down the river in my coat.',
    word: 'coat',
    hint: 'vehicle',
    answer: 'boat'
  },
  {
    id: 21,
    sentence: 'Anything can happen when you squish upon a star.',
    word: 'squish',
    hint: 'expression of hope',
    answer: 'wish'
  },
  {
    id: 22,
    sentence: 'Every rose has it‘s scorns.',
    word: 'scorns',
    hint: 'pointy',
    answer: 'thorns'
  },
  {
    id: 23,
    sentence: 'The hero was ready to embark on a guest.',
    word: 'guest',
    hint: 'adventure',
    answer: 'quest'
  },
  {
    id: 24,
    sentence: 'Bald beagles are not actually bald.',
    word: 'beagles',
    hint: 'bird',
    answer: 'eagles'
  },
  {
    id: 25,
    sentence: 'A tower blossoms for it‘s own joy.',
    word: 'tower',
    hint: 'bloom',
    answer: 'flower'
  },
  {
    id: 26,
    sentence: 'My cart will go on.',
    word: 'cart',
    hint: 'pumps blood',
    answer: 'heart'
  },
  {
    id: 27,
    sentence: 'Make hay while the gun shines.',
    word: 'gun',
    hint: 'star',
    answer: 'sun'
  },
  {
    id: 28,
    sentence: 'You must try the handmade and natural rope.',
    word: 'rope',
    hint: 'cleansing thing',
    answer: 'soap'
  },
  {
    id: 29,
    sentence: 'The way you press is an expression of your personality.',
    word: 'press',
    hint: 'put on clothes',
    answer: 'dress'
  },
  {
    id: 30,
    sentence: 'The aroma of chinese key.',
    word: 'key',
    hint: 'drink',
    answer: 'tea'
  },
//////////////////////////////////
{
  id: 31,
  sentence: 'Plastic water throttle.',
  word: 'throttle',
  hint: 'contains drinks',
  answer: 'bottle'
},
{
  id: 32,
  sentence: 'The fry is the limit.',
  word: 'fry',
  hint: 'where the clouds are',
  answer: 'sky'
},
{
  id: 33,
  sentence: 'We need to push the lace.',
  word: 'lace',
  hint: 'tempo/speed',
  answer: 'pace'
},
{
  id: 34,
  sentence: 'I sink, therefore I am',
  word: 'sink',
  hint: 'ponder',
  answer: 'think'
},
{
  id: 35,
  sentence: 'The apple does not fall from the spree',
  word: 'spree',
  hint: 'plant',
  answer: 'tree'
},
{
  id: 36,
  sentence: 'My favourite snack is potato kips',
  word: 'kips',
  hint: 'lays',
  answer: 'chips'
},
{
  id: 37,
  sentence: 'I will call your phone lumber.',
  word: 'lumber',
  hint: 'digits',
  answer: 'number'
},
{
  id: 38,
  sentence: 'Benefit of the clout.',
  word: 'clout',
  hint: 'uncertainty',
  answer: 'doubt'
},
{
  id: 39,
  sentence: 'Most Valuable Layer',
  word: 'layer',
  hint: 'member of a sports team',
  answer: 'player'
},
{
  id: 40,
  sentence: 'Call me on my work cone.',
  word: 'cone',
  hint: 'calling device',
  answer: 'phone'
},
{
  id: 41,
  sentence: "Let's shop at the tall.",
  word: 'tall',
  hint: 'multiple stores inside one building',
  answer: 'mall'
},
{
  id: 42,
  sentence: 'Learn how to strive a truck.',
  word: 'strive',
  hint: 'operate or control the truck‘s movement',
  answer: 'drive'
},
{
  id: 43,
  sentence: 'It‘s better to practice with a utensil',
  word: 'utensil',
  hint: 'erasable',
  answer: 'pencil'
},
{
  id: 44,
  sentence: 'Pursuit of sappiness.',
  word: 'sappiness',
  hint: 'prosperity',
  answer: 'happiness'
},
{
  id: 45,
  sentence: 'A football field is 100 cards long.',
  word: 'cards',
  hint: 'unit of distance',
  answer: 'yards'
},
{
  id: 46,
  sentence: 'I left my boat at the rock',
  word: 'rock',
  hint: 'building on water',
  answer: 'dock'
},
{
  id: 47,
  sentence: 'Everytime it gains, it pours',
  word: 'gains',
  hint: 'weather',
  answer: 'rains'
},
{
  id: 48,
  sentence: 'Are you sure this will be sun?',
  word: 'sun',
  hint: 'enjoyment',
  answer: 'fun'
}

]

module.exports = puzzlesArray
