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

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.less'],
})
export class GameScreenComponent implements OnInit {
  lastGuessedLetter: string;
  _hiddenPhrase: string;
  hiddenCharacters: string[];
  lettersByName = {};
  guessedLetters = {};
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
