import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderDistributionCarburantComponent} from './header-distribution-carburant.component';

describe('HeaderDistributionCarburantComponent', () => {
  let component: HeaderDistributionCarburantComponent;
  let fixture: ComponentFixture<HeaderDistributionCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderDistributionCarburantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDistributionCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
