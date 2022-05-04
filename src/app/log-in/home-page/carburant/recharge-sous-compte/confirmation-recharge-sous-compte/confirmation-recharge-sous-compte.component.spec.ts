import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationRechargeSousCompteComponent } from './confirmation-recharge-sous-compte.component';

describe('ConfirmationRechargeSousCompteComponent', () => {
  let component: ConfirmationRechargeSousCompteComponent;
  let fixture: ComponentFixture<ConfirmationRechargeSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationRechargeSousCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationRechargeSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
