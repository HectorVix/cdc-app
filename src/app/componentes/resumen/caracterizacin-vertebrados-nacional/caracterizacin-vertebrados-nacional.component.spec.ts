import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterizacinVertebradosNacionalComponent } from './caracterizacin-vertebrados-nacional.component';

describe('CaracterizacinVertebradosNacionalComponent', () => {
  let component: CaracterizacinVertebradosNacionalComponent;
  let fixture: ComponentFixture<CaracterizacinVertebradosNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracterizacinVertebradosNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracterizacinVertebradosNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
