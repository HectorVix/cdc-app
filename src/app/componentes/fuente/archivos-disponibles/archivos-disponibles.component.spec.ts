import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosDisponiblesComponent } from './archivos-disponibles.component';

describe('ArchivosDisponiblesComponent', () => {
  let component: ArchivosDisponiblesComponent;
  let fixture: ComponentFixture<ArchivosDisponiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosDisponiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
