import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDemandeAffectationCarteJockerComponent} from './delete-demande-affectation-carte-jocker.component';

describe('DeleteDemandeAffectationCarteJockerComponent', () => {
  let component: DeleteDemandeAffectationCarteJockerComponent;
  let fixture: ComponentFixture<DeleteDemandeAffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDemandeAffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemandeAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
