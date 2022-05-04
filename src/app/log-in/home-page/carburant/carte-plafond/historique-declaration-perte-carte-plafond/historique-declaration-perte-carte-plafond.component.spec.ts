import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueDeclarationPerteCartePlafondComponent} from './historique-declaration-perte-carte-plafond.component';

describe('HistoriqueDeclarationPerteCartePlafondComponent', () => {
  let component: HistoriqueDeclarationPerteCartePlafondComponent;
  let fixture: ComponentFixture<HistoriqueDeclarationPerteCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueDeclarationPerteCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDeclarationPerteCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
