import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDemandeQuotaCarteJockerComponent } from './delete-demande-quota-carte-jocker.component';

describe('DeleteDemandeQuotaCarteJockerComponent', () => {
  let component: DeleteDemandeQuotaCarteJockerComponent;
  let fixture: ComponentFixture<DeleteDemandeQuotaCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDemandeQuotaCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemandeQuotaCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
