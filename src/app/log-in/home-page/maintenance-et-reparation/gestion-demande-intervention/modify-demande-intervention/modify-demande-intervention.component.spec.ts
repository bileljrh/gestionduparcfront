import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDemandeInterventionComponent} from './modify-demande-intervention.component';

describe('ModifyDemandeInterventionComponent', () => {
  let component: ModifyDemandeInterventionComponent;
  let fixture: ComponentFixture<ModifyDemandeInterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDemandeInterventionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDemandeInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
