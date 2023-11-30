import { TestBed } from '@angular/core/testing';

import { CoinflipService } from './coinflip.service';

describe('CoinflipService', () => {
  let service: CoinflipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinflipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
