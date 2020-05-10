import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gamesService } from '../games/games-service';

@Component({
  selector: 'app-games-screen',
  templateUrl: './games-screen.component.html',
  styleUrls: ['./games-screen.component.less'],
})
export class GamesScreenComponent implements OnInit {
  gamesList;
  gameName: string;
  get hasGame() {
    return Boolean(this.gameName);
  }
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gamesList = gamesService.getGames();
    this.route.paramMap.subscribe((params) => {
      this.gameName = params.get('game');
    });
  }
}
