import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteSousFamilleArticleComponent} from './delete-sous-famille-article.component';

describe('DeleteSousFamilleArticleComponent', () => {
  let component: DeleteSousFamilleArticleComponent;
  let fixture: ComponentFixture<DeleteSousFamilleArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSousFamilleArticleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSousFamilleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
