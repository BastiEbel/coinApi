import { TestBed } from '@angular/core/testing';

import { UrlCoinService } from './url-coin.service';

describe('UrlCoinService', () => {
  let service: UrlCoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlCoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
