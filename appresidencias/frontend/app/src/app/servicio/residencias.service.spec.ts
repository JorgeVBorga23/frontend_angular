import { TestBed } from '@angular/core/testing';

import { ResidenciasService } from './residencias.service';

describe('ResidenciasService', () => {
  let service: ResidenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
