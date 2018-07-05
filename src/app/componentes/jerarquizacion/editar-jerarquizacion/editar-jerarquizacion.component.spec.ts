import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarJerarquizacionComponent } from './editar-jerarquizacion.component';

describe('EditarJerarquizacionComponent', () => {
  let component: EditarJerarquizacionComponent;
  let fixture: ComponentFixture<EditarJerarquizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarJerarquizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarJerarquizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
