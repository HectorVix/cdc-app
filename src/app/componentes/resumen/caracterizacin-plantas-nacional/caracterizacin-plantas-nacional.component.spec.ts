import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterizacinPlantasNacionalComponent } from './caracterizacin-plantas-nacional.component';

describe('CaracterizacinPlantasNacionalComponent', () => {
  let component: CaracterizacinPlantasNacionalComponent;
  let fixture: ComponentFixture<CaracterizacinPlantasNacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracterizacinPlantasNacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracterizacinPlantasNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
