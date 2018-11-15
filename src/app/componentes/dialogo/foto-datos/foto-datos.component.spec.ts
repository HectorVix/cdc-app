import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoDatosComponent } from './foto-datos.component';

describe('FotoDatosComponent', () => {
  let component: FotoDatosComponent;
  let fixture: ComponentFixture<FotoDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
