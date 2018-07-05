import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioJerarquizacionComponent } from './formulario-jerarquizacion.component';

describe('FormularioJerarquizacionComponent', () => {
  let component: FormularioJerarquizacionComponent;
  let fixture: ComponentFixture<FormularioJerarquizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioJerarquizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioJerarquizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
