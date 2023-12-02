import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxMiniComponent } from './card-box-mini.component';

describe('CardBoxMiniComponent', () => {
  let component: CardBoxMiniComponent;
  let fixture: ComponentFixture<CardBoxMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoxMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoxMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
