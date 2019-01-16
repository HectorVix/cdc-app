import { TestBed, inject } from '@angular/core/testing';

import { FuenteService } from './fuente.service';

describe('FuenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuenteService]
    });
  });

  it('should be created', inject([FuenteService], (service: FuenteService) => {
    expect(service).toBeTruthy();
  }));
});
