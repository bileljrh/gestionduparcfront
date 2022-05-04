import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionVehiculesDepassantDateRetourComponent} from './gestion-vehicules-depassant-date-retour.component';

describe('GestionVehiculesDepassantDateRetourComponent', () => {
  let component: GestionVehiculesDepassantDateRetourComponent;
  let fixture: ComponentFixture<GestionVehiculesDepassantDateRetourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionVehiculesDepassantDateRetourComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVehiculesDepassantDateRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
