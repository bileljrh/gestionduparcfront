import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueAffectationCartePlafondComponent} from './delete-historique-affectation-carte-plafond.component';

describe('DeleteHistoriqueAffectationCartePlafondComponent', () => {
  let component: DeleteHistoriqueAffectationCartePlafondComponent;
  let fixture: ComponentFixture<DeleteHistoriqueAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
