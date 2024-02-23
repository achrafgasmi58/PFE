import { TestBed } from '@angular/core/testing';

import { ModelOcrService } from './model-ocr.service';

describe('ModelOcrService', () => {
  let service: ModelOcrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelOcrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
