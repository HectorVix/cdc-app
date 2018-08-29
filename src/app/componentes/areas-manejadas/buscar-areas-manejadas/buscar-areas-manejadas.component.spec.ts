import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAreasManejadasComponent } from './buscar-areas-manejadas.component';

describe('BuscarAreasManejadasComponent', () => {
  let component: BuscarAreasManejadasComponent;
  let fixture: ComponentFixture<BuscarAreasManejadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarAreasManejadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarAreasManejadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
