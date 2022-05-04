import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistributionCarburantFonctionComponent} from './distribution-carburant-fonction.component';

describe('DistributionCarburantFonctionComponent', () => {
  let component: DistributionCarburantFonctionComponent;
  let fixture: ComponentFixture<DistributionCarburantFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionCarburantFonctionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionCarburantFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
