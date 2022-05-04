import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueDeclarationPerteCarteAgilisCashComponent} from './historique-declaration-perte-carte-agilis-cash.component';

describe('HistoriqueDeclarationPerteCarteAgilisCashComponent', () => {
  let component: HistoriqueDeclarationPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<HistoriqueDeclarationPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueDeclarationPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDeclarationPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
