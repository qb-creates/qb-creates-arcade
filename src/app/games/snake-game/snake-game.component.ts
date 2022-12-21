import { Component, OnInit } from '@angular/core';
import { PlayerInput, Canvas, QObject, Vector2, GameObject } from 'src/app/engine/qbcreates-js-engine';
import { LabelUI } from 'src/app/engine/ui/label-ui';
import { GameStateManager } from './managers/game-state-manager';
import { ScoreManager } from './managers/score-manager';
import * as prefab from './prefabs'
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
    QObject.instantiatePrefabObject(prefab.background);
    QObject.instantiatePrefabObject(prefab.apple);
    let border = QObject.instantiatePrefabObject(prefab.verticalBorder);
    border.transform.position = new Vector2(-10, 0);

    border = QObject.instantiatePrefabObject(prefab.verticalBorder);
    border.transform.position = new Vector2(10, 0);

    border = QObject.instantiatePrefabObject(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, 10);

    border = QObject.instantiatePrefabObject(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, -10);

    let player = QObject.instantiatePrefabObject(prefab.snake);

    let enemy = QObject.instantiatePrefabObject(prefab.enemy);
    enemy.getComponent(TestFollow).target = player;

    ScoreManager.scoreText =  QObject.instantiatePrefabObject(prefab.scoreLabel).getComponent(LabelUI);
    // let enemy2 = QObject.instantiatePrefabObject(prefab.enemy);
    // enemy2.transform.position = new Vector2(5, -5);
    // enemy2.getComponent(TestFollow).target = player;
  }
  onPlay() {
    GameStateManager.onGameStart();
  }
}

