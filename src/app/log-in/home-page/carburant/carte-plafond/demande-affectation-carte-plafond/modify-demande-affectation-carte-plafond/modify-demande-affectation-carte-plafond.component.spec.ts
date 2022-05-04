import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDemandeAffectationCartePlafondComponent} from './modify-demande-affectation-carte-plafond.component';

describe('ModifyDemandeAffectationCartePlafondComponent', () => {
  let component: ModifyDemandeAffectationCartePlafondComponent;
  let fixture: ComponentFixture<ModifyDemandeAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDemandeAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDemandeAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
