import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTrabajadorComponent } from './alta-trabajador.component';

describe('AltaTrabajadorComponent', () => {
  let component: AltaTrabajadorComponent;
  let fixture: ComponentFixture<AltaTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTrabajadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
