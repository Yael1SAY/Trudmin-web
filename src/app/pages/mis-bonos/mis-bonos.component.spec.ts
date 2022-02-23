import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisBonosComponent } from './mis-bonos.component';

describe('MisBonosComponent', () => {
  let component: MisBonosComponent;
  let fixture: ComponentFixture<MisBonosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisBonosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisBonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
