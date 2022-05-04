import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDistributionCarburantFonctionComponent} from './modify-distribution-carburant-fonction.component';

describe('ModifyDistributionCarburantFonctionComponent', () => {
  let component: ModifyDistributionCarburantFonctionComponent;
  let fixture: ComponentFixture<ModifyDistributionCarburantFonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDistributionCarburantFonctionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDistributionCarburantFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
