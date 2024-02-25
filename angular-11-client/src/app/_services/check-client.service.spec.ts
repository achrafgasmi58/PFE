import { TestBed } from '@angular/core/testing';

import { CheckClientService } from './check-client.service';

describe('CheckClientService', () => {
  let service: CheckClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
