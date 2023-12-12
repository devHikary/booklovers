import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxMdComponent } from './card-box-md.component';

describe('CardBoxMdComponent', () => {
  let component: CardBoxMdComponent;
  let fixture: ComponentFixture<CardBoxMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoxMdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoxMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
