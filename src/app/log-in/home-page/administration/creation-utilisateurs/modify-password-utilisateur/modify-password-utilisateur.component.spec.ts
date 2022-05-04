import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyPasswordUtilisateurComponent} from './modify-password-utilisateur.component';

describe('ModifyPasswordUtilisateurComponent', () => {
  let component: ModifyPasswordUtilisateurComponent;
  let fixture: ComponentFixture<ModifyPasswordUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyPasswordUtilisateurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPasswordUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
