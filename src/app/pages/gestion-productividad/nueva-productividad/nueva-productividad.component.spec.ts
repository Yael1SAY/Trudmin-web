import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaProductividadComponent } from './nueva-productividad.component';

describe('NuevaProductividadComponent', () => {
  let component: NuevaProductividadComponent;
  let fixture: ComponentFixture<NuevaProductividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaProductividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaProductividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
