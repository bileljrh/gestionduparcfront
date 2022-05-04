import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewBeneficiaireEmpruntComponent} from './new-beneficiaire-emprunt.component';

describe('NewBeneficiaireEmpruntComponent', () => {
  let component: NewBeneficiaireEmpruntComponent;
  let fixture: ComponentFixture<NewBeneficiaireEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBeneficiaireEmpruntComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBeneficiaireEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
