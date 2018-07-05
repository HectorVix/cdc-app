import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JerarquizacionComponent } from './jerarquizacion.component';

describe('JerarquizacionComponent', () => {
  let component: JerarquizacionComponent;
  let fixture: ComponentFixture<JerarquizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JerarquizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JerarquizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
