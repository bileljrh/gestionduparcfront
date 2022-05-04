import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRechargeComplementaireComponent } from './new-recharge-complementaire.component';

describe('NewRechargeComplementaireComponent', () => {
  let component: NewRechargeComplementaireComponent;
  let fixture: ComponentFixture<NewRechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
