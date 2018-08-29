import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarSitioComponent } from './buscar-sitio.component';

describe('BuscarSitioComponent', () => {
  let component: BuscarSitioComponent;
  let fixture: ComponentFixture<BuscarSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
