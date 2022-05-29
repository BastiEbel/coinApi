import { TestBed } from '@angular/core/testing';

import { GbpService } from './gbp.service';

describe('GbpService', () => {
  let service: GbpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GbpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
