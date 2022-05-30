import { TestBed } from '@angular/core/testing';

import { UsdService } from './usd.service';

describe('UsdService', () => {
  let service: UsdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
