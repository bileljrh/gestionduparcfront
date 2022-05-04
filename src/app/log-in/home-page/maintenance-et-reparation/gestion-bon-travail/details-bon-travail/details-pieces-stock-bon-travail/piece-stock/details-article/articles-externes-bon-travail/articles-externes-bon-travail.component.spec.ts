import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesExternesBonTravailComponent } from './articles-externes-bon-travail.component';

describe('ArticlesExternesBonTravailComponent', () => {
  let component: ArticlesExternesBonTravailComponent;
  let fixture: ComponentFixture<ArticlesExternesBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesExternesBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesExternesBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
