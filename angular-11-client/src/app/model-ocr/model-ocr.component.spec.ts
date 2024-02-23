import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOcrComponent } from './model-ocr.component';

describe('ModelOcrComponent', () => {
  let component: ModelOcrComponent;
  let fixture: ComponentFixture<ModelOcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelOcrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
