import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemandeQuotaCarteJockerComponent } from './update-demande-quota-carte-jocker.component';

describe('UpdateDemandeQuotaCarteJockerComponent', () => {
  let component: UpdateDemandeQuotaCarteJockerComponent;
  let fixture: ComponentFixture<UpdateDemandeQuotaCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDemandeQuotaCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDemandeQuotaCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
