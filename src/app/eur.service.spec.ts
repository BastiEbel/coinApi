import { TestBed } from '@angular/core/testing';

import { EurService } from './eur.service';

describe('EurService', () => {
  let service: EurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
