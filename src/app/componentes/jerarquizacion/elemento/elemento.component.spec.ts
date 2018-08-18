import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoComponent } from './elemento.component';

describe('ElementoComponent', () => {
  let component: ElementoComponent;
  let fixture: ComponentFixture<ElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
