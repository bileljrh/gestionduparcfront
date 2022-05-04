import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleForRetourStockComponent } from './article-for-retour-stock.component';

describe('ArticleForRetourStockComponent', () => {
  let component: ArticleForRetourStockComponent;
  let fixture: ComponentFixture<ArticleForRetourStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleForRetourStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleForRetourStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
