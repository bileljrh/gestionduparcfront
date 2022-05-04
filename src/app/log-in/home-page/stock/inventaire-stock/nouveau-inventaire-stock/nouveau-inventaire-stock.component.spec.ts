import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauInventaireStockComponent } from './nouveau-inventaire-stock.component';

describe('NouveauInventaireStockComponent', () => {
  let component: NouveauInventaireStockComponent;
  let fixture: ComponentFixture<NouveauInventaireStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauInventaireStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauInventaireStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
