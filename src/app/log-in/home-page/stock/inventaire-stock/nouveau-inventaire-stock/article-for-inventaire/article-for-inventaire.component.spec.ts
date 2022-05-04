import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleForInventaireComponent } from './article-for-inventaire.component';

describe('ArticleForInventaireComponent', () => {
  let component: ArticleForInventaireComponent;
  let fixture: ComponentFixture<ArticleForInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleForInventaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleForInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
