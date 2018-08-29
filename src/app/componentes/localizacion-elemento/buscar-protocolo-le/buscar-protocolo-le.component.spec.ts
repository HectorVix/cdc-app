import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarProtocoloLeComponent } from './buscar-protocolo-le.component';

describe('BuscarProtocoloLeComponent', () => {
  let component: BuscarProtocoloLeComponent;
  let fixture: ComponentFixture<BuscarProtocoloLeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarProtocoloLeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarProtocoloLeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
