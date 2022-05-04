import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDeclarationPerteCarteJockerComponent } from './historique-declaration-perte-carte-jocker.component';

describe('HistoriqueDeclarationPerteCarteJockerComponent', () => {
  let component: HistoriqueDeclarationPerteCarteJockerComponent;
  let fixture: ComponentFixture<HistoriqueDeclarationPerteCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueDeclarationPerteCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDeclarationPerteCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
