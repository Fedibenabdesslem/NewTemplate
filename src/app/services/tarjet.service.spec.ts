import { TestBed } from '@angular/core/testing';

import { TarjetService } from './tarjet.service';

describe('TarjetService', () => {
  let service: TarjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
