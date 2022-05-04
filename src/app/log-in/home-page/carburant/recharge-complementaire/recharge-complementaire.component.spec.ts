import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeComplementaireComponent } from './recharge-complementaire.component';

describe('RechargeComplementaireComponent', () => {
  let component: RechargeComplementaireComponent;
  let fixture: ComponentFixture<RechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
