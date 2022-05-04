import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRechargeSousCompteComponent } from './validation-recharge-sous-compte.component';

describe('ValidationRechargeSousCompteComponent', () => {
  let component: ValidationRechargeSousCompteComponent;
  let fixture: ComponentFixture<ValidationRechargeSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRechargeSousCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationRechargeSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
