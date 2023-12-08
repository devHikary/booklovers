import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFailureComponent } from './report-failure.component';

describe('ReportFailureComponent', () => {
  let component: ReportFailureComponent;
  let fixture: ComponentFixture<ReportFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
