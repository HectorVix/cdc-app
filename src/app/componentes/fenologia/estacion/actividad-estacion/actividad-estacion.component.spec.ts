import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadEstacionComponent } from './actividad-estacion.component';

describe('ActividadEstacionComponent', () => {
  let component: ActividadEstacionComponent;
  let fixture: ComponentFixture<ActividadEstacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadEstacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
