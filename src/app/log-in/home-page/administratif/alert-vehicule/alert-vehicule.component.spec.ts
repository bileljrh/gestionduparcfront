import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertVehiculeComponent } from './alert-vehicule.component';

describe('AlertVehiculeComponent', () => {
  let component: AlertVehiculeComponent;
  let fixture: ComponentFixture<AlertVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
