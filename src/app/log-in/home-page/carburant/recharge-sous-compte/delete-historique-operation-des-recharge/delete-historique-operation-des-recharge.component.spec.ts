import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHistoriqueOperationDesRechargeComponent } from './delete-historique-operation-des-recharge.component';

describe('DeleteHistoriqueOperationDesRechargeComponent', () => {
  let component: DeleteHistoriqueOperationDesRechargeComponent;
  let fixture: ComponentFixture<DeleteHistoriqueOperationDesRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHistoriqueOperationDesRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueOperationDesRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
