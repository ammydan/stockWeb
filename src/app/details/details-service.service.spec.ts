import { TestBed } from '@angular/core/testing';

import { DetailsServiceService } from './details-service.service';

describe('DetailsServiceService', () => {
  let service: DetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
