import { TestBed, inject } from '@angular/core/testing';

import { SitioService } from './sitio.service';

describe('SitioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitioService]
    });
  });

  it('should be created', inject([SitioService], (service: SitioService) => {
    expect(service).toBeTruthy();
  }));
});
