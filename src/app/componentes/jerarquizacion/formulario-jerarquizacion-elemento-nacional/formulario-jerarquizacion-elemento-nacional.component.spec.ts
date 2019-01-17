import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioJerarquizacionElementoNacionalComponent } from './formulario-jerarquizacion-elemento-nacional.component';

describe('FormularioJerarquizacionComponent', () => {
  let component: FormularioJerarquizacionElementoNacionalComponent;
  let fixture: ComponentFixture<FormularioJerarquizacionElementoNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioJerarquizacionElementoNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioJerarquizacionElementoNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
