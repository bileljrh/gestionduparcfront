import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationGenreVehiculeComponent} from './modification-genre-vehicule.component';

describe('ModificationGenreVehiculeComponent', () => {
  let component: ModificationGenreVehiculeComponent;
  let fixture: ComponentFixture<ModificationGenreVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationGenreVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationGenreVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
