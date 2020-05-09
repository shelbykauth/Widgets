import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallows-image',
  templateUrl: './gallows-image.component.html',
  styleUrls: ['./gallows-image.component.less'],
})
export class GallowsImageComponent implements OnInit {
  @Input() wrongGuesses: number;
  @Input() totalGuesses: number;

  color = 'red';

  get hideWhatParts() {
    const partsPerGuesses = {
      6: {
        head: this.wrongGuesses < 1,
        spine: this.wrongGuesses < 2,
        left_arm: this.wrongGuesses < 3,
        right_arm: this.wrongGuesses < 4,
        left_leg: this.wrongGuesses < 5,
        right_leg: this.wrongGuesses < 6,
      },
      5: {
        head: this.wrongGuesses < 1,
        spine: this.wrongGuesses < 2,
        left_arm: this.wrongGuesses < 3,
        right_arm: this.wrongGuesses < 4,
        left_leg: this.wrongGuesses < 5,
        right_leg: this.wrongGuesses < 5,
      },
      4: {
        head: this.wrongGuesses < 1,
        spine: this.wrongGuesses < 2,
        arms: this.wrongGuesses < 3,
        legs: this.wrongGuesses < 4,
      },
      3: {
        head: this.wrongGuesses < 1,
        spine: this.wrongGuesses < 1,
        arms: this.wrongGuesses < 2,
        legs: this.wrongGuesses < 3,
      },
      2: {
        head: this.wrongGuesses < 1,
        spine: this.wrongGuesses < 1,
        arms: this.wrongGuesses < 2,
        legs: this.wrongGuesses < 2,
      },
      1: {
        head: this.wrongGuesses < 1,
        body: this.wrongGuesses < 1,
      },
    };
    return partsPerGuesses[this.totalGuesses];
  }
  constructor() {}

  ngOnInit(): void {}
}
