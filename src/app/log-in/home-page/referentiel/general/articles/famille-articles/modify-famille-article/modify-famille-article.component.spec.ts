import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyFamilleArticleComponent} from './modify-famille-article.component';

describe('ModifyFamilleArticleComponent', () => {
  let component: ModifyFamilleArticleComponent;
  let fixture: ComponentFixture<ModifyFamilleArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyFamilleArticleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyFamilleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
