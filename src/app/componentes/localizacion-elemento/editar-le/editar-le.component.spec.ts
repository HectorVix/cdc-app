import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLeComponent } from './editar-le.component';

describe('EditarLeComponent', () => {
  let component: EditarLeComponent;
  let fixture: ComponentFixture<EditarLeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
