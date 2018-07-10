import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReComponent } from './formulario-re.component';

describe('FormularioReComponent', () => {
  let component: FormularioReComponent;
  let fixture: ComponentFixture<FormularioReComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioReComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
