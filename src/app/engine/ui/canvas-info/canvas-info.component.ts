import { Component, OnInit } from '@angular/core';
import { Canvas } from '../../canvas';

@Component({
  selector: 'app-canvas-info',
  templateUrl: './canvas-info.component.html',
  styleUrls: ['./canvas-info.component.scss']
})
export class CanvasInfoComponent implements OnInit {

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
