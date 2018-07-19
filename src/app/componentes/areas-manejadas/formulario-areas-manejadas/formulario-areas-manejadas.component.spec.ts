import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAreasManejadasComponent } from './formulario-areas-manejadas.component';

describe('FormularioAreasManejadasComponent', () => {
  let component: FormularioAreasManejadasComponent;
  let fixture: ComponentFixture<FormularioAreasManejadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAreasManejadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAreasManejadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
