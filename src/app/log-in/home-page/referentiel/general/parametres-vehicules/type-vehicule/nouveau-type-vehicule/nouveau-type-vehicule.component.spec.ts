import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouveauTypeVehiculeComponent} from './nouveau-type-vehicule.component';

describe('NouveauTypeVehiculeComponent', () => {
  let component: NouveauTypeVehiculeComponent;
  let fixture: ComponentFixture<NouveauTypeVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouveauTypeVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauTypeVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
