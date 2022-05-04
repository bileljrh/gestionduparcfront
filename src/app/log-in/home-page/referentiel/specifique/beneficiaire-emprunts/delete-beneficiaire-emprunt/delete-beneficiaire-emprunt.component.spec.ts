import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteBeneficiaireEmpruntComponent} from './delete-beneficiaire-emprunt.component';

describe('DeleteBeneficiaireEmpruntComponent', () => {
  let component: DeleteBeneficiaireEmpruntComponent;
  let fixture: ComponentFixture<DeleteBeneficiaireEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBeneficiaireEmpruntComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBeneficiaireEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
