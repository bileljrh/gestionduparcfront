import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleMarqueVehiculeComponent} from './nouvelle-marque-vehicule.component';

describe('NouvelleMarqueVehiculeComponent', () => {
  let component: NouvelleMarqueVehiculeComponent;
  let fixture: ComponentFixture<NouvelleMarqueVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleMarqueVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleMarqueVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
