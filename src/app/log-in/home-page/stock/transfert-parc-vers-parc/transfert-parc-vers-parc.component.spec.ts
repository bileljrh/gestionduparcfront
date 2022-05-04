import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertParcVersParcComponent } from './transfert-parc-vers-parc.component';

describe('TransfertParcVersParcComponent', () => {
  let component: TransfertParcVersParcComponent;
  let fixture: ComponentFixture<TransfertParcVersParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertParcVersParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertParcVersParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
