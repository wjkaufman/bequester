import { TestBed } from '@angular/core/testing';

import { BequestService } from './bequest.service';

describe('BequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BequestService = TestBed.get(BequestService);
    expect(service).toBeTruthy();
  });
});
