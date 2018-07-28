import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioJerarquizacionElementoGlobalComponent } from './formulario-jerarquizacion-elemento-global.component';

describe('FormularioJerarquizacionElementoGlobalComponent', () => {
  let component: FormularioJerarquizacionElementoGlobalComponent;
  let fixture: ComponentFixture<FormularioJerarquizacionElementoGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioJerarquizacionElementoGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioJerarquizacionElementoGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
