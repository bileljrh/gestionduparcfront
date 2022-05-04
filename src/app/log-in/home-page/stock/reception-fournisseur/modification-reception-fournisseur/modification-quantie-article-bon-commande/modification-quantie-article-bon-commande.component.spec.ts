import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationQuantieArticleBonCommandeComponent} from './modification-quantie-article-bon-commande.component';

describe('ModificationQuantieArticleBonCommandeComponent', () => {
  let component: ModificationQuantieArticleBonCommandeComponent;
  let fixture: ComponentFixture<ModificationQuantieArticleBonCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificationQuantieArticleBonCommandeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationQuantieArticleBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
