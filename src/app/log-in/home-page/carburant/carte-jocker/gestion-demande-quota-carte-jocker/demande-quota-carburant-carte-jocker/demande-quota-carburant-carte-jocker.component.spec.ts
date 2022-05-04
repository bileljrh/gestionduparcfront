import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeQuotaCarburantCarteJockerComponent } from './demande-quota-carburant-carte-jocker.component';

describe('DemandeQuotaCarburantCarteJockerComponent', () => {
  let component: DemandeQuotaCarburantCarteJockerComponent;
  let fixture: ComponentFixture<DemandeQuotaCarburantCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeQuotaCarburantCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeQuotaCarburantCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
