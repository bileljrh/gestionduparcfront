import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsBonCommandeDesBonsComponent} from './details-bon-commande-des-bons.component';

describe('DetailsBonCommandeDesBonsComponent', () => {
  let component: DetailsBonCommandeDesBonsComponent;
  let fixture: ComponentFixture<DetailsBonCommandeDesBonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsBonCommandeDesBonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonCommandeDesBonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
