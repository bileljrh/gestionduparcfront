import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSortieVehiculeComponent } from './date-sortie-vehicule.component';

describe('DateSortieVehiculeComponent', () => {
  let component: DateSortieVehiculeComponent;
  let fixture: ComponentFixture<DateSortieVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSortieVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSortieVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
