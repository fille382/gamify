import { TestBed } from '@angular/core/testing';

import { TwentyoneService } from './twentyone.service';

describe('TwentyoneService', () => {
  let service: TwentyoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwentyoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
