import { TestBed, inject } from '@angular/core/testing';

import { LocalizacionService } from './localizacion.service';

describe('LocalizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizacionService]
    });
  });

  it('should be created', inject([LocalizacionService], (service: LocalizacionService) => {
    expect(service).toBeTruthy();
  }));
});
