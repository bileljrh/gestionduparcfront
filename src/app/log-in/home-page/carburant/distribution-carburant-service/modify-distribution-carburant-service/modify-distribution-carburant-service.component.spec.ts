import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDistributionCarburantServiceComponent} from './modify-distribution-carburant-service.component';

describe('ModifyDistributionCarburantServiceComponent', () => {
  let component: ModifyDistributionCarburantServiceComponent;
  let fixture: ComponentFixture<ModifyDistributionCarburantServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDistributionCarburantServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDistributionCarburantServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
