import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDistributionCarburantFonctionComponent} from './delete-distribution-carburant-fonction.component';

describe('DeleteDistributionCarburantFonctionComponent', () => {
  let component: DeleteDistributionCarburantFonctionComponent;
  let fixture: ComponentFixture<DeleteDistributionCarburantFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDistributionCarburantFonctionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDistributionCarburantFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
