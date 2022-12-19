import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Canvas } from 'src/app/engine/canvas';

@Component({
  selector: 'app-grid-checkbox',
  templateUrl: './grid-checkbox.component.html',
  styleUrls: ['./grid-checkbox.component.scss']
})
export class GridCheckboxComponent implements OnInit {
  @Output() gridEnabled: EventEmitter<boolean> = new EventEmitter<boolean>();
  static asdf = 0;
  constructor() { }

  ngOnInit() {
  }

  onShowCanvasGridChange(event) {
    Canvas.showGrid = event;
  }

  onShowCollidersChange(event) {
    Canvas.showColliders = event;
  }
}
