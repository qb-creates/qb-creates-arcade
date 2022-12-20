import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnakeGameComponent } from './games/snake-game/snake-game.component';
import { FormsModule } from '@angular/forms';
import { CanvasInfoComponent } from './engine/ui/canvas-info/canvas-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeGameComponent,
    CanvasInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
