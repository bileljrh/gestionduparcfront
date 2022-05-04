import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRechargeComplementaireComponent } from './delete-recharge-complementaire.component';

describe('DeleteRechargeComplementaireComponent', () => {
  let component: DeleteRechargeComplementaireComponent;
  let fixture: ComponentFixture<DeleteRechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
