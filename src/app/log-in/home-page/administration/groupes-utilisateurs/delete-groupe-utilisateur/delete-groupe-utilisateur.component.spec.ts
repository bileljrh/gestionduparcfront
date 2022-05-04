import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteGroupeUtilisateurComponent} from './delete-groupe-utilisateur.component';

describe('DeleteGroupeUtilisateurComponent', () => {
  let component: DeleteGroupeUtilisateurComponent;
  let fixture: ComponentFixture<DeleteGroupeUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteGroupeUtilisateurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGroupeUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
