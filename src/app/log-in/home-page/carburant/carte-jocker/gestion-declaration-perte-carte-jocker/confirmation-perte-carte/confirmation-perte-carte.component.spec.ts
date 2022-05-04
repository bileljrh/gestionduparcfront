import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPerteCarteComponent } from './confirmation-perte-carte.component';

describe('ConfirmationPerteCarteComponent', () => {
  let component: ConfirmationPerteCarteComponent;
  let fixture: ComponentFixture<ConfirmationPerteCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationPerteCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
