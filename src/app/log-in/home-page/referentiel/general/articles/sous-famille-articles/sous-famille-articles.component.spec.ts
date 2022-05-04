import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SousFamilleArticlesComponent} from './sous-famille-articles.component';

describe('SousFamilleArticlesComponent', () => {
  let component: SousFamilleArticlesComponent;
  let fixture: ComponentFixture<SousFamilleArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SousFamilleArticlesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousFamilleArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
