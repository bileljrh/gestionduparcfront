import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleForBonTravailComponent } from './article-for-bon-travail.component';

describe('ArticleForBonTravailComponent', () => {
  let component: ArticleForBonTravailComponent;
  let fixture: ComponentFixture<ArticleForBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleForBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleForBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
