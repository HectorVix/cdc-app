import { TestBed, inject } from '@angular/core/testing';

import { JerarquizacionService } from './jerarquizacion.service';

describe('JerarquizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JerarquizacionService]
    });
  });

  it('should be created', inject([JerarquizacionService], (service: JerarquizacionService) => {
    expect(service).toBeTruthy();
  }));
});
