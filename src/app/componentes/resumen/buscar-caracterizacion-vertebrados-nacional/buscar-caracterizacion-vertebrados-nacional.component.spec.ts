import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCaracterizacionVertebradosNacionalComponent } from './buscar-caracterizacion-vertebrados-nacional.component';

describe('BuscarCaracterizacionVertebradosNacionalComponent', () => {
  let component: BuscarCaracterizacionVertebradosNacionalComponent;
  let fixture: ComponentFixture<BuscarCaracterizacionVertebradosNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarCaracterizacionVertebradosNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCaracterizacionVertebradosNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
