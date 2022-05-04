import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsPiecesStockBonTravailComponent} from './details-pieces-stock-bon-travail.component';

describe('DetailsPiecesStockBonTravailComponent', () => {
  let component: DetailsPiecesStockBonTravailComponent;
  let fixture: ComponentFixture<DetailsPiecesStockBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsPiecesStockBonTravailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPiecesStockBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
