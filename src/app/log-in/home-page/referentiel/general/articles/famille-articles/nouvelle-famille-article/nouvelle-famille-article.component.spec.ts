import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleFamilleArticleComponent} from './nouvelle-famille-article.component';

describe('NouvelleFamilleArticleComponent', () => {
  let component: NouvelleFamilleArticleComponent;
  let fixture: ComponentFixture<NouvelleFamilleArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleFamilleArticleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleFamilleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
