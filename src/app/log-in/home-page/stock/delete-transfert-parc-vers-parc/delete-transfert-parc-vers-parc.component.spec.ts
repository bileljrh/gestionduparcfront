import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransfertParcVersParcComponent } from './delete-transfert-parc-vers-parc.component';

describe('DeleteTransfertParcVersParcComponent', () => {
  let component: DeleteTransfertParcVersParcComponent;
  let fixture: ComponentFixture<DeleteTransfertParcVersParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTransfertParcVersParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTransfertParcVersParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
