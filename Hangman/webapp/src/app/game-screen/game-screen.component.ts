import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.less'],
})
export class GameScreenComponent implements OnInit {
  wrongGuesses = 3;
  totalGuesses = 6;
  constructor() {}

  ngOnInit(): void {}
}
