import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCaracterizacionPlantasNacionalComponent } from './buscar-caracterizacion-plantas-nacional.component';

describe('BuscarCaracterizacionPlantasNacionalComponent', () => {
  let component: BuscarCaracterizacionPlantasNacionalComponent;
  let fixture: ComponentFixture<BuscarCaracterizacionPlantasNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarCaracterizacionPlantasNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCaracterizacionPlantasNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
