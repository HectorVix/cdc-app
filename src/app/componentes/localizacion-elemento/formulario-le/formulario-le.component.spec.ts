import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLeComponent } from './formulario-le.component';

describe('FormularioLeComponent', () => {
  let component: FormularioLeComponent;
  let fixture: ComponentFixture<FormularioLeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioLeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioLeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
