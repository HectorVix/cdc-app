import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSitioComponent } from './registro-sitio.component';

describe('RegistroSitioComponent', () => {
  let component: RegistroSitioComponent;
  let fixture: ComponentFixture<RegistroSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
