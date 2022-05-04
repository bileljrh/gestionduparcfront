import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeDesCarburantsDeFonctionComponent } from './recharge-des-carburants-de-fonction.component';

describe('RechargeDesCarburantsDeFonctionComponent', () => {
  let component: RechargeDesCarburantsDeFonctionComponent;
  let fixture: ComponentFixture<RechargeDesCarburantsDeFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeDesCarburantsDeFonctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeDesCarburantsDeFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
