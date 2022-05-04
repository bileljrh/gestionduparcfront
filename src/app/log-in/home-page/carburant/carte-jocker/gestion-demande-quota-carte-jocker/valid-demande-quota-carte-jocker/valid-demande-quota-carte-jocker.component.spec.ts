import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidDemandeQuotaCarteJockerComponent } from './valid-demande-quota-carte-jocker.component';

describe('ValidDemandeQuotaCarteJockerComponent', () => {
  let component: ValidDemandeQuotaCarteJockerComponent;
  let fixture: ComponentFixture<ValidDemandeQuotaCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidDemandeQuotaCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidDemandeQuotaCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
