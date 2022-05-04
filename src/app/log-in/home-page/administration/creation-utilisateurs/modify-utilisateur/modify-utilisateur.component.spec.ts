import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyUtilisateurComponent} from './modify-utilisateur.component';

describe('ModifyUtilisateurComponent', () => {
  let component: ModifyUtilisateurComponent;
  let fixture: ComponentFixture<ModifyUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyUtilisateurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
