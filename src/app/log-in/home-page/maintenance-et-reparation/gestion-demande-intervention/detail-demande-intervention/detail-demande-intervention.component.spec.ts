import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailDemandeInterventionComponent} from './detail-demande-intervention.component';

describe('DetailDemandeInterventionComponent', () => {
  let component: DetailDemandeInterventionComponent;
  let fixture: ComponentFixture<DetailDemandeInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDemandeInterventionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDemandeInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
