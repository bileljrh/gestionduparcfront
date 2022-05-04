import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTransfertParcVersParcComponent } from './modify-transfert-parc-vers-parc.component';

describe('ModifyTransfertParcVersParcComponent', () => {
  let component: ModifyTransfertParcVersParcComponent;
  let fixture: ComponentFixture<ModifyTransfertParcVersParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyTransfertParcVersParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTransfertParcVersParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
