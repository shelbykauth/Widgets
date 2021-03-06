const myPhrases = {
  mothersDay: [
    "Happy Mother's Day!",
    'I love you, mom',
    'You are wonderful!',
    'Mother, Mom, Superhero',
    'You have a zoo',
    'You rock',
    'Mama Bear',
    'Spoonful of sugar',
    "Have a Fan - freaking - tastic mother's day",
  ],
  [512]: [
    'Happy Anniversary!',
    'Happy 28 Years!',
    'I love you guys',
    'Enjoy your special day',
    'Marie and Eddie',
    'Marie and Eddy',
    'A Night to Remember',
    'Mom and Dad',
    'Together Forever',
    'White picket fence and two point five kids',
    '28 Years',
  ],
};
const allPhrases = [];
for (let set in myPhrases) {
  myPhrases[set].forEach((phrase) => {
    allPhrases.push(phrase);
  });
}

export const PhraseService = {
  getRandomPhrase(settings: string) {
    let phrases = this.getPhraseSet(settings);
    let index = Math.floor(Math.random() * phrases.length);
    let phrase = phrases[index];
    return phrase;
  },
  getPhraseSet(settings: string) {
    let phrases = myPhrases[settings] || allPhrases;
    return phrases;
  },
};
