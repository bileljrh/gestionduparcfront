import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FamilleArticlesComponent} from './famille-articles.component';

describe('FamilleArticlesComponent', () => {
  let component: FamilleArticlesComponent;
  let fixture: ComponentFixture<FamilleArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FamilleArticlesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilleArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
