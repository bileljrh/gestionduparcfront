import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDemandeTransfertComponent } from './validate-demande-transfert.component';

describe('ValidateDemandeTransfertComponent', () => {
  let component: ValidateDemandeTransfertComponent;
  let fixture: ComponentFixture<ValidateDemandeTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateDemandeTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDemandeTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
