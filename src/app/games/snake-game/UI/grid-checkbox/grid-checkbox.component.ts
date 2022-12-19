import { Component, OnInit } from '@angular/core';
import { Canvas } from 'src/app/engine/canvas';

@Component({
  selector: 'app-grid-checkbox',
  templateUrl: './grid-checkbox.component.html',
  styleUrls: ['./grid-checkbox.component.scss']
})
export class GridCheckboxComponent implements OnInit {
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
