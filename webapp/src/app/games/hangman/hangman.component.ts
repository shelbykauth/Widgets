import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhraseService } from './phrase-service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.less'],
})
export class HangmanComponent implements OnInit {
  phrase: string;
  lastGuessedLetter: string;
  _hiddenPhrase: string;
  hiddenCharacters: string[];
  isRevealed: boolean;
  isContinued: boolean;
  /**@type {Object<string, Letter>} */
  lettersByName = {};
  // lettersToGuess = [];
  totalGuesses = 6;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let start = 'A'.charCodeAt(0);
    let end = 'Z'.charCodeAt(0) + 1;
    for (let i = start; i < end; i++) {
      let char = String.fromCharCode(i);
      this.lettersByName[char] = new Letter(char);
    }
    this.generateNewPhrase();
  }

  generateNewPhrase() {
    this.route.paramMap.subscribe((params) => {
      let settings = params.get('settings');
      this.hiddenPhrase = PhraseService.getRandomPhrase(settings);
    });
  }

  reset() {
    this.generateNewPhrase();
    this.isContinued = false;
    this.isRevealed = false;
  }

  reveal() {
    this.isRevealed = true;
    this.isContinued = false;
  }

  continue() {
    this.isContinued = true;
    this.isRevealed = false;
  }

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
      if (this.isRevealed) {
        return character;
      } else if (letter) {
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

  get hasCompleted() {
    return this.hasWon || this.hasLost;
  }

  get disableButtons() {
    return this.hasWon || (this.hasCompleted && !this.isContinued);
  }
}

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
