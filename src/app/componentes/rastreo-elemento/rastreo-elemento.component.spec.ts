import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreoElementoComponent } from './rastreo-elemento.component';

describe('RastreoElementoComponent', () => {
  let component: RastreoElementoComponent;
  let fixture: ComponentFixture<RastreoElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RastreoElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreoElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
