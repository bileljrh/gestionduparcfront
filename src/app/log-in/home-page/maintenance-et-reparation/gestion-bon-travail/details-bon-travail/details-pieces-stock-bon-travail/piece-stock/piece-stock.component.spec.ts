import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PieceStockComponent} from './piece-stock.component';

describe('PieceStockComponent', () => {
  let component: PieceStockComponent;
  let fixture: ComponentFixture<PieceStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieceStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
