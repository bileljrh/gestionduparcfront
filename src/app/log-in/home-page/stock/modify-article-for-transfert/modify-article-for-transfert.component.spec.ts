import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArticleForTransfertComponent } from './modify-article-for-transfert.component';

describe('ModifyArticleForTransfertComponent', () => {
  let component: ModifyArticleForTransfertComponent;
  let fixture: ComponentFixture<ModifyArticleForTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyArticleForTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyArticleForTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
