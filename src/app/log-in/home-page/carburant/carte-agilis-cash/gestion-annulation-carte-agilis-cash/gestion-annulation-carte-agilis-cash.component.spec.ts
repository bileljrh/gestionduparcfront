import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionAnnulationCarteAgilisCashComponent} from './gestion-annulation-carte-agilis-cash.component';

describe('GestionAnnulationCarteAgilisCashComponent', () => {
  let component: GestionAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<GestionAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
