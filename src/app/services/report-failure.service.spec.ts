import { TestBed } from '@angular/core/testing';

import { ReportFailureService } from './report-failure.service';

describe('ReportFailureService', () => {
  let service: ReportFailureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportFailureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
