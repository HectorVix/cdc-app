import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacionElementoComponent } from './localizacion-elemento.component';

describe('LocalizacionElementoComponent', () => {
  let component: LocalizacionElementoComponent;
  let fixture: ComponentFixture<LocalizacionElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizacionElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizacionElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
