import { TestBed } from '@angular/core/testing';

import { CustomDatapickerService } from './custom-datapicker.service';

describe('CustomDatapickerService', () => {
  let service: CustomDatapickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDatapickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
