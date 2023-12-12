import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorUnavailableComponent } from './error-unavailable.component';

describe('ErrorUnavailableComponent', () => {
  let component: ErrorUnavailableComponent;
  let fixture: ComponentFixture<ErrorUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorUnavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
