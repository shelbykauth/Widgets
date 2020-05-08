import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AngularHelpComponent } from './angular-help/angular-help.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

const routes: Routes = [
  { path: 'AngularHelp', component: AngularHelpComponent },
  { path: 'AboutComponent', component: AboutComponent },
  { path: 'GameScreenComponent', component: GameScreenComponent },
  { path: 'HomeScreenComponent', component: HomeScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
