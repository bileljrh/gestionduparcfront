import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NouveauArticleBonCommandeComponent} from './nouveau-article-bon-commande.component';

describe('NouveauArticleBonCommandeComponent', () => {
  let component: NouveauArticleBonCommandeComponent;
  let fixture: ComponentFixture<NouveauArticleBonCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouveauArticleBonCommandeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauArticleBonCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
