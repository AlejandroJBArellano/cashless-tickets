import { TestBed } from '@angular/core/testing';

import { CorteDeCajaService } from './corte-de-caja.service';

describe('CorteDeCajaService', () => {
  let service: CorteDeCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorteDeCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
