import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishmanFighterComponent } from './fishman-fighter.component';

describe('FishmanFighterComponent', () => {
  let component: FishmanFighterComponent;
  let fixture: ComponentFixture<FishmanFighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishmanFighterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishmanFighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
