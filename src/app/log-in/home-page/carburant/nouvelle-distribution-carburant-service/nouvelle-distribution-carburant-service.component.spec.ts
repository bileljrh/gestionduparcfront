import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleDistributionCarburantServiceComponent} from './nouvelle-distribution-carburant-service.component';

describe('NouvelleDistributionCarburantServiceComponent', () => {
  let component: NouvelleDistributionCarburantServiceComponent;
  let fixture: ComponentFixture<NouvelleDistributionCarburantServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleDistributionCarburantServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleDistributionCarburantServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
