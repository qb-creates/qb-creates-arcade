import { Component, OnInit } from '@angular/core';
import { PlayerInput, Canvas, QObject, Vector2, GameObject, SpriteRenderer } from 'src/app/engine/qbcreates-js-engine';
import { LabelUI } from 'src/app/engine/ui/label-ui';
import { GameStateManager } from './managers/game-state-manager';
import { ScoreManager } from './managers/score-manager';
import * as prefab from './prefabs'
import {snake} from './prefabs/snake-prefabs'
import { TestFollow } from './test-follow';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    Canvas.configureCanvas(1280, 720, 25);
    QObject.instantiate(prefab.background);
    QObject.instantiate(prefab.apple);
    let border = QObject.instantiate(prefab.verticalBorder);
    border.transform.position = new Vector2(-10, 0);
    
    border = QObject.instantiate(prefab.verticalBorder);
    border.transform.position = new Vector2(10, 0);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, 10);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, -10);

    let player = QObject.instantiate(snake);
  
    let enemy = QObject.instantiate(prefab.enemy);
    enemy.getComponent(TestFollow).target = player;

    QObject.instantiate(prefab.playButton);

    ScoreManager.scoreText =  QObject.instantiate(prefab.scoreLabel).getComponent(LabelUI);
    let enemy2 = QObject.instantiate(prefab.enemy);
    enemy2.transform.position = new Vector2(5, -5);
    enemy2.getComponent(TestFollow).target = player;
  }
}

