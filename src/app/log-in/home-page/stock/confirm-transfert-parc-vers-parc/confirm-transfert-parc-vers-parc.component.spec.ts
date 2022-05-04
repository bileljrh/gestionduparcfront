import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTransfertParcVersParcComponent } from './confirm-transfert-parc-vers-parc.component';

describe('ConfirmTransfertParcVersParcComponent', () => {
  let component: ConfirmTransfertParcVersParcComponent;
  let fixture: ComponentFixture<ConfirmTransfertParcVersParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTransfertParcVersParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTransfertParcVersParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
