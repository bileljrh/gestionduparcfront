import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArticleInventaireStockComponent } from './modify-article-inventaire-stock.component';

describe('ModifyArticleInventaireStockComponent', () => {
  let component: ModifyArticleInventaireStockComponent;
  let fixture: ComponentFixture<ModifyArticleInventaireStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyArticleInventaireStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyArticleInventaireStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
