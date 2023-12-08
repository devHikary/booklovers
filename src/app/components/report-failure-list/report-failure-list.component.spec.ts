import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFailureListComponent } from './report-failure-list.component';

describe('ReportFailureListComponent', () => {
  let component: ReportFailureListComponent;
  let fixture: ComponentFixture<ReportFailureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFailureListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFailureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
