import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDistributionCarburantServiceComponent} from './delete-distribution-carburant-service.component';

describe('DeleteDistributionCarburantServiceComponent', () => {
  let component: DeleteDistributionCarburantServiceComponent;
  let fixture: ComponentFixture<DeleteDistributionCarburantServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDistributionCarburantServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDistributionCarburantServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
