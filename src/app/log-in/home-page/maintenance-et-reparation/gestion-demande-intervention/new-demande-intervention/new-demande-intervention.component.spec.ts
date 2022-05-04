import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewDemandeInterventionComponent} from './new-demande-intervention.component';

describe('NewDemandeInterventionComponent', () => {
  let component: NewDemandeInterventionComponent;
  let fixture: ComponentFixture<NewDemandeInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDemandeInterventionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDemandeInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
