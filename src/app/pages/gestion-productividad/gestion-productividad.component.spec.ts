import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProductividadComponent } from './gestion-productividad.component';

describe('ProductividadComponent', () => {
  let component: GestionProductividadComponent;
  let fixture: ComponentFixture<GestionProductividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProductividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProductividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
