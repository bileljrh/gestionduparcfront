import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDemandeAffectationCarteJockerComponent} from './modify-demande-affectation-carte-jocker.component';

describe('ModifyDemandeAffectationCarteJockerComponent', () => {
  let component: ModifyDemandeAffectationCarteJockerComponent;
  let fixture: ComponentFixture<ModifyDemandeAffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDemandeAffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDemandeAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
