import { TestBed } from '@angular/core/testing';

import { FactrureService } from './factrure.service';

describe('FactrureService', () => {
  let service: FactrureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactrureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
