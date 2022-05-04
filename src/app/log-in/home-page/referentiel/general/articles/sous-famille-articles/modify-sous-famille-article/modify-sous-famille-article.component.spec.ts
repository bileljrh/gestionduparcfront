import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySousFamilleArticleComponent } from './modify-sous-famille-article.component';

describe('ModifySousFamilleArticleComponent', () => {
  let component: ModifySousFamilleArticleComponent;
  let fixture: ComponentFixture<ModifySousFamilleArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySousFamilleArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySousFamilleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
