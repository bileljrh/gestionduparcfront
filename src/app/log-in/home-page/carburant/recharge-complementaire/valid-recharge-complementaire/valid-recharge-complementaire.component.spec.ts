import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidRechargeComplementaireComponent } from './valid-recharge-complementaire.component';

describe('ValidRechargeComplementaireComponent', () => {
  let component: ValidRechargeComplementaireComponent;
  let fixture: ComponentFixture<ValidRechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidRechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidRechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
