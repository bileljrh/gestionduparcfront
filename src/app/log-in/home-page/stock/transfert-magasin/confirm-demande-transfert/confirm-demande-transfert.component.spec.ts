import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDemandeTransfertComponent } from './confirm-demande-transfert.component';

describe('ConfirmDemandeTransfertComponent', () => {
  let component: ConfirmDemandeTransfertComponent;
  let fixture: ComponentFixture<ConfirmDemandeTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDemandeTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDemandeTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
