import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BeneficiaireEmpruntsComponent} from './beneficiaire-emprunts.component';

describe('BeneficiaireEmpruntsComponent', () => {
  let component: BeneficiaireEmpruntsComponent;
  let fixture: ComponentFixture<BeneficiaireEmpruntsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiaireEmpruntsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaireEmpruntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
