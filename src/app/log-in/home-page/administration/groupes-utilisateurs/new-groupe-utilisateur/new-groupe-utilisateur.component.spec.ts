import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewGroupeUtilisateurComponent} from './new-groupe-utilisateur.component';

describe('NewGroupeUtilisateurComponent', () => {
  let component: NewGroupeUtilisateurComponent;
  let fixture: ComponentFixture<NewGroupeUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGroupeUtilisateurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupeUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
