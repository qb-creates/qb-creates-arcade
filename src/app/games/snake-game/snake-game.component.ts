import { Component, OnInit } from '@angular/core';
import { Canvas, QObject, Vector2 } from 'src/app/engine/qbcreates-js-engine';
import { LabelUI } from 'src/app/engine/ui/label-ui';
import { ScoreManager } from './managers/score-manager';
import * as prefab from './prefabs'
import { snake } from './prefabs/snake-prefabs';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    Canvas.configureCanvas(1280, 720, 25, true);
    QObject.instantiate(prefab.background);
    QObject.instantiate(prefab.apple);
    QObject.instantiate(snake); 
    QObject.instantiate(prefab.playButton);
    
    let border = QObject.instantiate(prefab.verticalBorder);
    border.transform.position = new Vector2(-10, 0);

    border = QObject.instantiate(prefab.verticalBorder);
    border.transform.position = new Vector2(10, 0);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, 10);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, -10);

    ScoreManager.scoreText = QObject.instantiate(prefab.scoreLabel).getComponent(LabelUI);
  }
}