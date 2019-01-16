import { TestBed, inject } from '@angular/core/testing';

import { CaracterizacionService } from './caracterizacion.service';

describe('CaracterizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaracterizacionService]
    });
  });

  it('should be created', inject([CaracterizacionService], (service: CaracterizacionService) => {
    expect(service).toBeTruthy();
  }));
});
