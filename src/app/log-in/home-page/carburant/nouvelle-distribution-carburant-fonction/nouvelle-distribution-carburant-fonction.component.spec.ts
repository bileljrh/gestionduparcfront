import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleDistributionCarburantFonctionComponent} from './nouvelle-distribution-carburant-fonction.component';

describe('NouvelleDistributionCarburantFonctionComponent', () => {
  let component: NouvelleDistributionCarburantFonctionComponent;
  let fixture: ComponentFixture<NouvelleDistributionCarburantFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleDistributionCarburantFonctionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleDistributionCarburantFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
