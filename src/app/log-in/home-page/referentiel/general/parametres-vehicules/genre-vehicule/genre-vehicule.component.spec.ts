import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GenreVehiculeComponent} from './genre-vehicule.component';

describe('GenreVehiculeComponent', () => {
  let component: GenreVehiculeComponent;
  let fixture: ComponentFixture<GenreVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenreVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
