import { TestBed } from '@angular/core/testing';

import { TpApiService } from './tp-api.service';

describe('TpApiService', () => {
  let service: TpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
