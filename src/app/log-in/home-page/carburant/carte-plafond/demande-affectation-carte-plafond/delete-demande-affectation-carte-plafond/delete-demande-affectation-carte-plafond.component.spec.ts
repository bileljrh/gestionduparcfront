import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDemandeAffectationCartePlafondComponent} from './delete-demande-affectation-carte-plafond.component';

describe('DeleteDemandeAffectationCartePlafondComponent', () => {
  let component: DeleteDemandeAffectationCartePlafondComponent;
  let fixture: ComponentFixture<DeleteDemandeAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDemandeAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemandeAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
