import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasManejadasComponent } from './areas-manejadas.component';

describe('AreasManejadasComponent', () => {
  let component: AreasManejadasComponent;
  let fixture: ComponentFixture<AreasManejadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasManejadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasManejadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
