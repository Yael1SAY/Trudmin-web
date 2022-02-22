import { TestBed } from '@angular/core/testing';

import { ProductividadService } from './productividad.service';

describe('ProductividadService', () => {
  let service: ProductividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
