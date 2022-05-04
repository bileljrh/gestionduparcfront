import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouveauGenreVehiculeComponent} from './nouveau-genre-vehicule.component';

describe('NouveauGenreVehiculeComponent', () => {
  let component: NouveauGenreVehiculeComponent;
  let fixture: ComponentFixture<NouveauGenreVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouveauGenreVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauGenreVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
