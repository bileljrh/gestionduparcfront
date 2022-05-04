import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyGroupeUtilisateurComponent} from './modify-groupe-utilisateur.component';

describe('ModifyGroupeUtilisateurComponent', () => {
  let component: ModifyGroupeUtilisateurComponent;
  let fixture: ComponentFixture<ModifyGroupeUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyGroupeUtilisateurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyGroupeUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
