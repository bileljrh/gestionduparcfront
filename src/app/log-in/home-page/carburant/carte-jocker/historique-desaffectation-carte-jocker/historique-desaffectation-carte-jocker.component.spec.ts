import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueDesaffectationCarteJockerComponent} from './historique-desaffectation-carte-jocker.component';

describe('HistoriqueDesaffectationCarteJockerComponent', () => {
  let component: HistoriqueDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<HistoriqueDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
