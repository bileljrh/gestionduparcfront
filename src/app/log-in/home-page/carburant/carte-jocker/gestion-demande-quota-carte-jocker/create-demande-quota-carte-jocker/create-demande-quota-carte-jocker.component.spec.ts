import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemandeQuotaCarteJockerComponent } from './create-demande-quota-carte-jocker.component';

describe('CreateDemandeQuotaCarteJockerComponent', () => {
  let component: CreateDemandeQuotaCarteJockerComponent;
  let fixture: ComponentFixture<CreateDemandeQuotaCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDemandeQuotaCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDemandeQuotaCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
