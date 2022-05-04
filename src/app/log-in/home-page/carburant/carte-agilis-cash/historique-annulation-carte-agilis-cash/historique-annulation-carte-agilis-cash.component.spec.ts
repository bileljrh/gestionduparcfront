import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueAnnulationCarteAgilisCashComponent} from './historique-annulation-carte-agilis-cash.component';

describe('HistoriqueAnnulationCarteAgilisCashComponent', () => {
  let component: HistoriqueAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<HistoriqueAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
