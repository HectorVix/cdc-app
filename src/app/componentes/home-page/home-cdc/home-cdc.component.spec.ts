import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCdcComponent } from './home-cdc.component';

describe('HomeCdcComponent', () => {
  let component: HomeCdcComponent;
  let fixture: ComponentFixture<HomeCdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
