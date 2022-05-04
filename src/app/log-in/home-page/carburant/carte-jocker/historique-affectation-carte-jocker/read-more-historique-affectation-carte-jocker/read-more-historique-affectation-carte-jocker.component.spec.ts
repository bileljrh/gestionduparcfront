import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadMoreHistoriqueAffectationCarteJockerComponent} from './read-more-historique-affectation-carte-jocker.component';

describe('ReadMoreHistoriqueAffectationCarteJockerComponent', () => {
  let component: ReadMoreHistoriqueAffectationCarteJockerComponent;
  let fixture: ComponentFixture<ReadMoreHistoriqueAffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreHistoriqueAffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreHistoriqueAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
