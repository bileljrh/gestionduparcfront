import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRegulationStockOperationComponent } from './delete-regulation-stock-operation.component';

describe('DeleteRegulationStockOperationComponent', () => {
  let component: DeleteRegulationStockOperationComponent;
  let fixture: ComponentFixture<DeleteRegulationStockOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRegulationStockOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRegulationStockOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
