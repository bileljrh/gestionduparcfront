import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadMoreHistoriqueAnnulationCarteAgilisCashComponent} from './read-more-historique-annulation-carte-agilis-cash.component';

describe('ReadMoreHistoriqueAnnulationCarteAgilisCashComponent', () => {
  let component: ReadMoreHistoriqueAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<ReadMoreHistoriqueAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreHistoriqueAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreHistoriqueAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
