import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterizacionPlantasNacionalComponent } from './caracterizacion-plantas-nacional.component';

describe('CaracterizacionPlantasNacionalComponent', () => {
  let component: CaracterizacionPlantasNacionalComponent;
  let fixture: ComponentFixture<CaracterizacionPlantasNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracterizacionPlantasNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracterizacionPlantasNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
