import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AngularHelpComponent } from './angular-help/angular-help.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    GameScreenComponent,
    HomeScreenComponent,
    AngularHelpComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
