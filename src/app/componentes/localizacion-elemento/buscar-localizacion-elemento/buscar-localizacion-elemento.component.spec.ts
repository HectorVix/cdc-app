import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarLocalizacionElementoComponent } from './buscar-localizacion-elemento.component';

describe('BuscarLocalizacionElementoComponent', () => {
  let component: BuscarLocalizacionElementoComponent;
  let fixture: ComponentFixture<BuscarLocalizacionElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarLocalizacionElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarLocalizacionElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
