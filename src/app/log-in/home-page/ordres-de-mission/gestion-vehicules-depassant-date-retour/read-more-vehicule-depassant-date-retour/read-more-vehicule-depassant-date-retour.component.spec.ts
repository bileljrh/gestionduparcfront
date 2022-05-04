import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadMoreVehiculeDepassantDateRetourComponent} from './read-more-vehicule-depassant-date-retour.component';

describe('ReadMoreVehiculeDepassantDateRetourComponent', () => {
  let component: ReadMoreVehiculeDepassantDateRetourComponent;
  let fixture: ComponentFixture<ReadMoreVehiculeDepassantDateRetourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreVehiculeDepassantDateRetourComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreVehiculeDepassantDateRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
