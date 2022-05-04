import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivateDesactivateUtilisateursComponent} from './activate-desactivate-utilisateurs.component';

describe('ActivateDesactivateUtilisateursComponent', () => {
  let component: ActivateDesactivateUtilisateursComponent;
  let fixture: ComponentFixture<ActivateDesactivateUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivateDesactivateUtilisateursComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDesactivateUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
