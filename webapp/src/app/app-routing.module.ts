import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AngularHelpComponent } from './angular-help/angular-help.component';
import { GamesScreenComponent } from './games-screen/games-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent },
  { path: 'angular-help', component: AngularHelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'games', component: GamesScreenComponent },
  { path: 'games/:game', component: GamesScreenComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
