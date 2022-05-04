import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeclarationPerteCarteJockerComponent } from './gestion-declaration-perte-carte-jocker.component';

describe('GestionDeclarationPerteCarteJockerComponent', () => {
  let component: GestionDeclarationPerteCarteJockerComponent;
  let fixture: ComponentFixture<GestionDeclarationPerteCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDeclarationPerteCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDeclarationPerteCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
