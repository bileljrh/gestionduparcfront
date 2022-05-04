import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDemandeDesaffectationCarteJockerComponent} from './modify-demande-desaffectation-carte-jocker.component';

describe('ModifyDemandeDesaffectationCarteJockerComponent', () => {
  let component: ModifyDemandeDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<ModifyDemandeDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDemandeDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDemandeDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
