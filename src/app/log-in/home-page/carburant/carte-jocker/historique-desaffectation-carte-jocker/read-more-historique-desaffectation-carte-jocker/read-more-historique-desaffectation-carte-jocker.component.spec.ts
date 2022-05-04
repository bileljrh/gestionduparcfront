import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadMoreHistoriqueDesaffectationCarteJockerComponent} from './read-more-historique-desaffectation-carte-jocker.component';

describe('ReadMoreHistoriqueDesaffectationCarteJockerComponent', () => {
  let component: ReadMoreHistoriqueDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<ReadMoreHistoriqueDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreHistoriqueDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreHistoriqueDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
