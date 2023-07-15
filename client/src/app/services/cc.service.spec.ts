import { TestBed } from '@angular/core/testing';

import { CcService } from './cc.service';

describe('CcService', () => {
  let service: CcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
