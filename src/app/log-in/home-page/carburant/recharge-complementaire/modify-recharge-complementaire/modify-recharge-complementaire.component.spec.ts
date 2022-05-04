import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRechargeComplementaireComponent } from './modify-recharge-complementaire.component';

describe('ModifyRechargeComplementaireComponent', () => {
  let component: ModifyRechargeComplementaireComponent;
  let fixture: ComponentFixture<ModifyRechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
