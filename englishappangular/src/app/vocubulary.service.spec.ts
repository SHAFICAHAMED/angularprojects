import { TestBed } from '@angular/core/testing';

import { VocubularyService } from './vocubulary.service';

describe('VocubularyService', () => {
  let service: VocubularyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocubularyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
