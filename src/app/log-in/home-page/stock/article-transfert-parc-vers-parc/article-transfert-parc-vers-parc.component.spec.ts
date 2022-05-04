import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTransfertParcVersParcComponent } from './article-transfert-parc-vers-parc.component';

describe('ArticleTransfertParcVersParcComponent', () => {
  let component: ArticleTransfertParcVersParcComponent;
  let fixture: ComponentFixture<ArticleTransfertParcVersParcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTransfertParcVersParcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTransfertParcVersParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
