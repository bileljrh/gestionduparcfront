import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyBeneficiaireEmpruntComponent} from './modify-beneficiaire-emprunt.component';

describe('ModifyBeneficiaireEmpruntComponent', () => {
  let component: ModifyBeneficiaireEmpruntComponent;
  let fixture: ComponentFixture<ModifyBeneficiaireEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyBeneficiaireEmpruntComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBeneficiaireEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
