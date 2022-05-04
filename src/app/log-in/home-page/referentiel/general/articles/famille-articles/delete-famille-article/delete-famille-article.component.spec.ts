import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteFamilleArticleComponent} from './delete-famille-article.component';

describe('DeleteFamilleArticleComponent', () => {
  let component: DeleteFamilleArticleComponent;
  let fixture: ComponentFixture<DeleteFamilleArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFamilleArticleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFamilleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
