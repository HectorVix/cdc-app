import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarFuenteComponent } from './buscar-fuente.component';

describe('BuscarFuenteComponent', () => {
  let component: BuscarFuenteComponent;
  let fixture: ComponentFixture<BuscarFuenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarFuenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarFuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
