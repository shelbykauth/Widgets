import { Component, OnInit } from '@angular/core';

class Letter {
  constructor(char) {
    this.name = char;
    this.guessed = false;
    this.inWord = false;
  }
  name: string;
  guessed: boolean;
  inWord: boolean;
  get wrong() {
    return this.guessed && !this.inWord;
  }
  get display() {
    if (!this.guessed) {
      return '_';
    } else {
      return this.name;
    }
  }
  guess() {
    this.guessed = true;
  }
  reset() {
    this.guessed = false;
    this.inWord = false;
  }
}

const partDecider = {
  /**@type {Object<string,number[][]>} */
  arrayedParts: {
    head: [
      [0],
      [1, 0],
      [1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
    ],
    body: [
      [0],
      [1, 0],
      [1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
    ],
    spine: [
      [0],
      [1, 0],
      [1, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
    ],
    arms: [
      [0],
      [1, 0],
      [1, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
    ],
    left_arm: [
      [0],
      [1, 0],
      [1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
    ],
    right_arm: [
      [0],
      [1, 0],
      [1, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
    ],
    legs: [
      [0],
      [1, 0],
      [1, 1, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 0],
    ],
    left_leg: [
      [0],
      [1, 0],
      [1, 1, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 0, 0],
    ],
    right_leg: [
      [0],
      [1, 0],
      [1, 1, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 0],
    ],
    frown: [
      [0],
      [1, 0],
      [1, 1, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 0],
    ],
  },
  decideWhatToHideShort: function (wrong: number, total: number) {
    let left = total - wrong;
    let fraction = wrong / total;
    const hiding = {
      frown: left > 0,
      right_leg: left > 0,
      left_leg: left > 1,
      legs: left > 0 && total < 6,
      right_arm: left > 2,
      left_arm: left > 3,
      arms: fraction < 2 / 3,
      spine: false,
      body: false,
      head: wrong < 1,
    };
    return hiding;
  },
  decideWhatToHideLong: function (wrong: number, total: number) {
    const hiding = {
      head: Boolean(this.arrayedParts.head[total][wrong]),
      // body: Boolean(this.arrayedParts.body[total][wrong]),
      spine: Boolean(this.arrayedParts.spine[total][wrong]),
      // arms: Boolean(this.arrayedParts.arms[total][wrong]),
      left_arm: Boolean(this.arrayedParts.left_arm[total][wrong]),
      right_arm: Boolean(this.arrayedParts.right_arm[total][wrong]),
      // legs: Boolean(this.arrayedParts.legs[total][wrong]),
      left_leg: Boolean(this.arrayedParts.left_leg[total][wrong]),
      right_leg: Boolean(this.arrayedParts.right_leg[total][wrong]),
      frown: Boolean(this.arrayedParts.frown[total][wrong]),
      saved_man: true,
      hanged_man: false,
    };
    return hiding;
  },
};
export { partDecider };

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.less'],
})
export class GameScreenComponent implements OnInit {
  lastGuessedLetter: string;
  _hiddenPhrase: string;
  hiddenCharacters: string[];
  /**@type {Object<string, Letter>} */
  lettersByName = {};
  // lettersToGuess = [];
  totalGuesses = 6;

  get wrongGuesses() {
    return this.lettersList.reduce((count: number, letter: Letter) => {
      if (letter.wrong) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
  }
  get lettersList() {
    return Object.keys(this.lettersByName).map(
      (key) => this.lettersByName[key]
    );
  }
  get hideWhatParts() {
    let hiding = partDecider.decideWhatToHideLong(
      this.wrongGuesses,
      this.totalGuesses
    );
    hiding.saved_man = !this.hasWon;
    hiding.hanged_man = this.hasWon;
    return hiding;
    const total = this.totalGuesses;
    const wrong = this.wrongGuesses;
    const left = total - wrong;
    const fractionWrong = wrong / total;
    const partsPerGuesses = {
      6: {
        head: wrong < 1,
        spine: wrong < 2,
        left_arm: wrong < 3,
        right_arm: wrong < 4,
        left_leg: wrong < 5,
        right_leg: wrong < 6,
        frown: wrong < 6,
      },
      5: {
        head: wrong < 1,
        spine: wrong < 2,
        left_arm: wrong < 3,
        right_arm: wrong < 4,
        left_leg: wrong < 5,
        right_leg: wrong < 5,
        frown: wrong < 5,
      },
      4: {
        head: wrong < 1,
        spine: wrong < 2,
        arms: wrong < 3,
        left_arm: wrong < 3,
        right_arm: wrong < 3,
        legs: wrong < 4,
        left_leg: wrong < 4,
        right_leg: wrong < 4,
        frown: wrong < 4,
      },
      3: {
        head: wrong < 1,
        spine: wrong < 1,
        arms: wrong < 2,
        left_arm: wrong < 2,
        right_arm: wrong < 2,
        legs: wrong < 3,
        left_leg: wrong < 3,
        right_leg: wrong < 3,
        frown: wrong < 3,
      },
      2: {
        head: wrong < 1,
        spine: wrong < 1,
        arms: wrong < 2,
        left_arm: wrong < 2,
        right_arm: wrong < 2,
        legs: wrong < 2,
        left_leg: wrong < 2,
        right_leg: wrong < 2,
        frown: wrong < 2,
      },
      1: {
        head: wrong < 1,
        body: wrong < 1,
        spine: wrong < 1,
        arms: wrong < 1,
        left_arm: wrong < 1,
        right_arm: wrong < 1,
        legs: wrong < 1,
        left_leg: wrong < 1,
        right_leg: wrong < 1,
        frown: wrong < 1,
      },
    };
    return partsPerGuesses[this.totalGuesses];
  }

  set hiddenPhrase(val) {
    this._hiddenPhrase = val.toUpperCase();
    this.lettersList.forEach((letter) => {
      letter.reset();
    });
    this.hiddenCharacters = this._hiddenPhrase.split('');
    this.hiddenCharacters.forEach((char) => {
      let letter = this.lettersByName[char];
      if (letter) {
        console.log(letter);
        letter.inWord = true;
      }
    });
  }

  get hiddenPhrase() {
    return this._hiddenPhrase;
  }

  get displayPhrase() {
    let hiddenLetters = this.hiddenPhrase.toUpperCase().split('');
    let displayCharacters = hiddenLetters.map((character) => {
      let letter = this.lettersByName[character];
      if (letter) {
        if (letter.guessed === false) {
          return '_';
        } else {
          return letter.name;
        }
      } else {
        return character;
      }
    });
    return displayCharacters.join('\u00A0');
    return "H A _ _ Y   M O _ H _ R ' _   D A Y";
  }

  get hasWon() {
    if (this.hasLost) {
      return false;
    }
    return this.hiddenCharacters.reduce((winning, char) => {
      let letter = this.lettersByName[char];
      let okay = !letter || letter.guessed;
      return winning && okay;
    }, true);
  }

  get hasLost() {
    return this.wrongGuesses >= this.totalGuesses;
  }

  get hasComplete() {
    return this.hasWon || this.hasLost;
  }

  constructor() {}

  ngOnInit(): void {
    let start = 'A'.charCodeAt(0);
    let end = 'Z'.charCodeAt(0) + 1;
    for (let i = start; i < end; i++) {
      let char = String.fromCharCode(i);
      this.lettersByName[char] = new Letter(char);
    }
    this.hiddenPhrase = "Happy Mother's Day!";
  }
}
