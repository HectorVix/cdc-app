import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioResumenFuenteComponent } from './formulario-resumen-fuente.component';

describe('FormularioResumenFuenteComponent', () => {
  let component: FormularioResumenFuenteComponent;
  let fixture: ComponentFixture<FormularioResumenFuenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioResumenFuenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioResumenFuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
