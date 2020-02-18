import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenologiaComponent } from './fenologia.component';

describe('FenologiaComponent', () => {
  let component: FenologiaComponent;
  let fixture: ComponentFixture<FenologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
