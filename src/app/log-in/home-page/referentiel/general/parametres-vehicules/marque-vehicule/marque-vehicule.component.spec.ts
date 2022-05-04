import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MarqueVehiculeComponent} from './marque-vehicule.component';

describe('MarqueVehiculeComponent', () => {
  let component: MarqueVehiculeComponent;
  let fixture: ComponentFixture<MarqueVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarqueVehiculeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
