import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductividadComponent } from './editar-productividad.component';

describe('EditarProductividadComponent', () => {
  let component: EditarProductividadComponent;
  let fixture: ComponentFixture<EditarProductividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProductividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProductividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
