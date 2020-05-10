import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AngularHelpComponent } from './angular-help/angular-help.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GamesScreenComponent } from './games-screen/games-screen.component';
import { HangmanComponent } from './games/hangman/hangman.component';
import { GallowsImageComponent } from './games/hangman/gallows-image/gallows-image.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    GamesScreenComponent,
    HomeScreenComponent,
    AngularHelpComponent,
    PageNotFoundComponent,
    GamesScreenComponent,
    HangmanComponent,
    GallowsImageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
