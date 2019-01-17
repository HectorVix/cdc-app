import { TestBed, inject } from '@angular/core/testing';

import { GaleriaService } from './galeria.service';

describe('GaleriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GaleriaService]
    });
  });

  it('should be created', inject([GaleriaService], (service: GaleriaService) => {
    expect(service).toBeTruthy();
  }));
});
