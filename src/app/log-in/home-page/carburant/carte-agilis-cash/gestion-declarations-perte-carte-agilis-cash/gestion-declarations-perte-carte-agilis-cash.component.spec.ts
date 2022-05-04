import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionDeclarationsPerteCarteAgilisCashComponent} from './gestion-declarations-perte-carte-agilis-cash.component';

describe('GestionDeclarationsPerteCarteAgilisCashComponent', () => {
  let component: GestionDeclarationsPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<GestionDeclarationsPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDeclarationsPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDeclarationsPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
