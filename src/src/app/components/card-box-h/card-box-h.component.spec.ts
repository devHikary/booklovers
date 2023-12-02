import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxHComponent } from './card-box-h.component';

describe('CardBoxHComponent', () => {
  let component: CardBoxHComponent;
  let fixture: ComponentFixture<CardBoxHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoxHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoxHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
