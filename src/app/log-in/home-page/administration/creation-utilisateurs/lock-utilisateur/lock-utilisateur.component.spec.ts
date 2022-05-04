import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LockUtilisateurComponent} from './lock-utilisateur.component';

describe('LockUtilisateurComponent', () => {
  let component: LockUtilisateurComponent;
  let fixture: ComponentFixture<LockUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockUtilisateurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
