import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent} from './plus-info-historique-declaration-perte-carte-agilis-cash.component';

describe('PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent', () => {
  let component: PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusInfoHistoriqueDeclarationPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
