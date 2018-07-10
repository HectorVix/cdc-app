import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReComponent } from './editar-re.component';

describe('EditarReComponent', () => {
  let component: EditarReComponent;
  let fixture: ComponentFixture<EditarReComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarReComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
