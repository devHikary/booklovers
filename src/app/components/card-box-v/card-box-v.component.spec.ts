import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxVComponent } from './card-box-v.component';

describe('CardBoxVComponent', () => {
  let component: CardBoxVComponent;
  let fixture: ComponentFixture<CardBoxVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoxVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoxVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
