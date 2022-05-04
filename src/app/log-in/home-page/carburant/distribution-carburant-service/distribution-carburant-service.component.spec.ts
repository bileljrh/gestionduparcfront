import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistributionCarburantServiceComponent} from './distribution-carburant-service.component';

describe('DistributionCarburantServiceComponent', () => {
  let component: DistributionCarburantServiceComponent;
  let fixture: ComponentFixture<DistributionCarburantServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionCarburantServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionCarburantServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
