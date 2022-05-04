import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BonCommandeDesBonsComponent} from './bon-commande-des-bons.component';

describe('BonCommandeDesBonsComponent', () => {
  let component: BonCommandeDesBonsComponent;
  let fixture: ComponentFixture<BonCommandeDesBonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BonCommandeDesBonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeDesBonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
