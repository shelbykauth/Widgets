import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AngularHelpComponent } from './angular-help/angular-help.component';
import { GallowsImageComponent } from './gallows-image/gallows-image.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    GameScreenComponent,
    HomeScreenComponent,
    AngularHelpComponent,
    GallowsImageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
