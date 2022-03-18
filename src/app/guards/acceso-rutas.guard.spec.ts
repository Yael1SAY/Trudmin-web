import { TestBed } from '@angular/core/testing';

import { AccesoRutasGuard } from './acceso-rutas.guard';

describe('AccesoRutasGuard', () => {
  let guard: AccesoRutasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesoRutasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
