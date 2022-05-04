import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDemandeDesaffectationCarteJockerComponent} from './confirm-demande-desaffectation-carte-jocker.component';

describe('ConfirmDemandeDesaffectationCarteJockerComponent', () => {
  let component: ConfirmDemandeDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<ConfirmDemandeDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDemandeDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDemandeDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
