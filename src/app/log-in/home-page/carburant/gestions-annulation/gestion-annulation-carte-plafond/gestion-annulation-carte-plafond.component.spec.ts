import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionAnnulationCartePlafondComponent} from './gestion-annulation-carte-plafond.component';

describe('GestionAnnulationCartePlafondComponent', () => {
  let component: GestionAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<GestionAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
