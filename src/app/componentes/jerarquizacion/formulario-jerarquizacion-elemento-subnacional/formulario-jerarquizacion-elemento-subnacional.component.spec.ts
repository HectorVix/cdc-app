import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioJerarquizacionElementoSubnacionalComponent } from './formulario-jerarquizacion-elemento-subnacional.component';

describe('FormularioJerarquizacionElementoSubnacionalComponent', () => {
  let component: FormularioJerarquizacionElementoSubnacionalComponent;
  let fixture: ComponentFixture<FormularioJerarquizacionElementoSubnacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioJerarquizacionElementoSubnacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioJerarquizacionElementoSubnacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
