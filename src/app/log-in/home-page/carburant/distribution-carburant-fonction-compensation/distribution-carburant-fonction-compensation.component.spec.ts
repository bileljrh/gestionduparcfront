import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistributionCarburantFonctionCompensationComponent} from './distribution-carburant-fonction-compensation.component';

describe('DistributionCarburantFonctionCompensationComponent', () => {
  let component: DistributionCarburantFonctionCompensationComponent;
  let fixture: ComponentFixture<DistributionCarburantFonctionCompensationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionCarburantFonctionCompensationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionCarburantFonctionCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
