import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientFileComponent } from './edit-client-file.component';

describe('EditClientFileComponent', () => {
  let component: EditClientFileComponent;
  let fixture: ComponentFixture<EditClientFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClientFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
