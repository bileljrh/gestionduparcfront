import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionDeclarationPerteCarteComponent} from './gestion-declaration-perte-carte.component';

describe('GestionDeclarationPerteCarteComponent', () => {
  let component: GestionDeclarationPerteCarteComponent;
  let fixture: ComponentFixture<GestionDeclarationPerteCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDeclarationPerteCarteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDeclarationPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
