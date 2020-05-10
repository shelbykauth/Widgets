import { HangmanComponent } from './hangman/hangman.component';

export const gamesService = {
  getGames: function () {
    return [{ component: HangmanComponent, name: 'Hangman' }];
  },
};
