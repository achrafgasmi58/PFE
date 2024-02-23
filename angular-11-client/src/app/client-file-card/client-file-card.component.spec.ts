import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFileCardComponent } from './client-file-card.component';

describe('ClientFileCardComponent', () => {
  let component: ClientFileCardComponent;
  let fixture: ComponentFixture<ClientFileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
