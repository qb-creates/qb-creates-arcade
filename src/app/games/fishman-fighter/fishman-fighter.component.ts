import { Component, OnInit } from '@angular/core';
import { ButtonInterface, LabelInterface } from 'src/app/engine/component-interface';
import { Prefab } from 'src/app/engine/q-object';
import { PlayerInput, Canvas, QObject, Vector2, GameObject, SpriteRenderer, BoxCollider } from 'src/app/engine/qbcreates-js-engine';
import * as prefab from './fishman-fighter-prefabs'
import { FishmanInput } from './fishman/fishman-input';

@Component({
  selector: 'app-fishman-fighter',
  templateUrl: './fishman-fighter.component.html',
  styleUrls: ['./fishman-fighter.component.scss']
})
export class FishmanFighterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Canvas.configureCanvas(1280, 720, 25, true);
    QObject.instantiate(prefab.background);

    let border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, -14 );
    border.transform.scale = new Vector2(60, 1);
    border.getComponent(BoxCollider).scale = new Vector2(border.getComponent(BoxCollider).scale.x, 1);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, -10 );
    border.transform.scale = new Vector2(6, 1);
    border.getComponent(BoxCollider).scale = new Vector2(border.getComponent(BoxCollider).scale.x, 1);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(0, -1 );
    border.transform.scale = new Vector2(10, 1);
    border.getComponent(BoxCollider).scale = new Vector2(border.getComponent(BoxCollider).scale.x, 1);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(-14, -6 );
    border.transform.scale = new Vector2(10, 1);
    border.getComponent(BoxCollider).scale = new Vector2(border.getComponent(BoxCollider).scale.x, 1);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(14, -6 );
    border.transform.scale = new Vector2(10, 1);
    border.getComponent(BoxCollider).scale = new Vector2(border.getComponent(BoxCollider).scale.x, 1);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(-25.4, 0 );
    border.transform.scale = new Vector2(1, 30);
    border.getComponent(BoxCollider).scale = new Vector2(1, border.getComponent(BoxCollider).scale.y);

    border = QObject.instantiate(prefab.horizontalBorder);
    border.transform.position = new Vector2(25.4, 0 );
    border.transform.scale = new Vector2(1, 30);
    border.getComponent(BoxCollider).scale = new Vector2(1, border.getComponent(BoxCollider).scale.y);


    let enemy = QObject.instantiate(prefab.player);
    let a = enemy.getComponent(BoxCollider);
    a.offset = new Vector2(0, -.7);
  }
}
