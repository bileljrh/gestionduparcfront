import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResetPasswordUtilisateurComponent} from './reset-password-utilisateur.component';

describe('ResetPasswordUtilisateurComponent', () => {
  let component: ResetPasswordUtilisateurComponent;
  let fixture: ComponentFixture<ResetPasswordUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordUtilisateurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
