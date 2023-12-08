import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGoalHComponent } from './card-goal-h.component';

describe('CardGoalHComponent', () => {
  let component: CardGoalHComponent;
  let fixture: ComponentFixture<CardGoalHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardGoalHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGoalHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
