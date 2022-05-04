import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleExterneForBonTravailComponent } from './article-externe-for-bon-travail.component';

describe('ArticleExterneForBonTravailComponent', () => {
  let component: ArticleExterneForBonTravailComponent;
  let fixture: ComponentFixture<ArticleExterneForBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleExterneForBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleExterneForBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
