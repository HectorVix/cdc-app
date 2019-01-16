import { TestBed, inject } from '@angular/core/testing';

import { ElementoService } from './elemento.service';

describe('ElementoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementoService]
    });
  });

  it('should be created', inject([ElementoService], (service: ElementoService) => {
    expect(service).toBeTruthy();
  }));
});
