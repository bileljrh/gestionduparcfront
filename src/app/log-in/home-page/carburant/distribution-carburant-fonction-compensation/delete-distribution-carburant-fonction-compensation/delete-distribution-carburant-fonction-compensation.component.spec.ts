import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDistributionCarburantFonctionCompensationComponent} from './delete-distribution-carburant-fonction-compensation.component';

describe('DeleteDistributionCarburantFonctionCompensationComponent', () => {
  let component: DeleteDistributionCarburantFonctionCompensationComponent;
  let fixture: ComponentFixture<DeleteDistributionCarburantFonctionCompensationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDistributionCarburantFonctionCompensationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDistributionCarburantFonctionCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
