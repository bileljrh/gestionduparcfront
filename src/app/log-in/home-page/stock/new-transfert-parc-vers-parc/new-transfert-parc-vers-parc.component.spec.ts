import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransfertParcVersParcComponent } from './new-transfert-parc-vers-parc.component';

describe('NewTransfertParcVersParcComponent', () => {
  let component: NewTransfertParcVersParcComponent;
  let fixture: ComponentFixture<NewTransfertParcVersParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTransfertParcVersParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransfertParcVersParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
