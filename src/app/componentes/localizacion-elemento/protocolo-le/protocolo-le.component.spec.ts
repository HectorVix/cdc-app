import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloLeComponent } from './protocolo-le.component';

describe('ProtocoloLeComponent', () => {
  let component: ProtocoloLeComponent;
  let fixture: ComponentFixture<ProtocoloLeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocoloLeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocoloLeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
