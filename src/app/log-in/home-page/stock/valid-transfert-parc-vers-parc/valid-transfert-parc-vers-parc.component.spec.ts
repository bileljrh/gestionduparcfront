import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidTransfertParcVersParcComponent } from './valid-transfert-parc-vers-parc.component';

describe('ValidTransfertParcVersParcComponent', () => {
  let component: ValidTransfertParcVersParcComponent;
  let fixture: ComponentFixture<ValidTransfertParcVersParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidTransfertParcVersParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidTransfertParcVersParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
