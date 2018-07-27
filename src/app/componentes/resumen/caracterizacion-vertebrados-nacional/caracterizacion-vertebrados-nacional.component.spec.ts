import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterizacionVertebradosNacionalComponent } from './caracterizacion-vertebrados-nacional.component';

describe('CaracterizacionVertebradosNacionalComponent', () => {
  let component: CaracterizacionVertebradosNacionalComponent;
  let fixture: ComponentFixture<CaracterizacionVertebradosNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracterizacionVertebradosNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracterizacionVertebradosNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
