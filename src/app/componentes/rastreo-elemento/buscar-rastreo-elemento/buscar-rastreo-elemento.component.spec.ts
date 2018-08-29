import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRastreoElementoComponent } from './buscar-rastreo-elemento.component';

describe('BuscarRastreoElementoComponent', () => {
  let component: BuscarRastreoElementoComponent;
  let fixture: ComponentFixture<BuscarRastreoElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarRastreoElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarRastreoElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
