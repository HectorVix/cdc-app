import { TestBed, inject } from '@angular/core/testing';

import { RastreoService } from './rastreo.service';

describe('RastreoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RastreoService]
    });
  });

  it('should be created', inject([RastreoService], (service: RastreoService) => {
    expect(service).toBeTruthy();
  }));
});
