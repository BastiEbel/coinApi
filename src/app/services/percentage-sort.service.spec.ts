import { TestBed } from '@angular/core/testing';

import { PercentageSortService } from './percentage-sort.service';

describe('PercentageSortService', () => {
  let service: PercentageSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PercentageSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
