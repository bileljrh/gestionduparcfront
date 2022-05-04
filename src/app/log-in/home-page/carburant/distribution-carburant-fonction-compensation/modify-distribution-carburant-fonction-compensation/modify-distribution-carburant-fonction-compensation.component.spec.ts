import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDistributionCarburantFonctionCompensationComponent} from './modify-distribution-carburant-fonction-compensation.component';

describe('ModifyDistributionCarburantFonctionCompensationComponent', () => {
  let component: ModifyDistributionCarburantFonctionCompensationComponent;
  let fixture: ComponentFixture<ModifyDistributionCarburantFonctionCompensationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDistributionCarburantFonctionCompensationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDistributionCarburantFonctionCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
