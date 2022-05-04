import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInventaireStockOperationComponent } from './delete-inventaire-stock-operation.component';

describe('DeleteInventaireStockOperationComponent', () => {
  let component: DeleteInventaireStockOperationComponent;
  let fixture: ComponentFixture<DeleteInventaireStockOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInventaireStockOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInventaireStockOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
