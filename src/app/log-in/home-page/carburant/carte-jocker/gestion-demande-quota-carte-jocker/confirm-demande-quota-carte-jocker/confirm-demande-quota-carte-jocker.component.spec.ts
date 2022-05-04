import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDemandeQuotaCarteJockerComponent } from './confirm-demande-quota-carte-jocker.component';

describe('ConfirmDemandeQuotaCarteJockerComponent', () => {
  let component: ConfirmDemandeQuotaCarteJockerComponent;
  let fixture: ComponentFixture<ConfirmDemandeQuotaCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDemandeQuotaCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDemandeQuotaCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
