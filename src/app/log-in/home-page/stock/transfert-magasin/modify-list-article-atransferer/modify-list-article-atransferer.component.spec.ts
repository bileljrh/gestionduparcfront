import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyListArticleATransfererComponent } from './modify-list-article-atransferer.component';

describe('ModifyListArticleATransfererComponent', () => {
  let component: ModifyListArticleATransfererComponent;
  let fixture: ComponentFixture<ModifyListArticleATransfererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyListArticleATransfererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyListArticleATransfererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
