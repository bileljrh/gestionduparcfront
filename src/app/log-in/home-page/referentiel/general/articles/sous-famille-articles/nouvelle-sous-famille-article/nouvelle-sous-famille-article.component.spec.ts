import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleSousFamilleArticleComponent} from './nouvelle-sous-famille-article.component';

describe('NouvelleSousFamilleArticleComponent', () => {
  let component: NouvelleSousFamilleArticleComponent;
  let fixture: ComponentFixture<NouvelleSousFamilleArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleSousFamilleArticleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleSousFamilleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
