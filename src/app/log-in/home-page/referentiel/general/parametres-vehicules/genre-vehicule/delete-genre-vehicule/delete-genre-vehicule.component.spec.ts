import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteGenreVehiculeComponent} from './delete-genre-vehicule.component';

describe('DeleteGenreVehiculeComponent', () => {
  let component: DeleteGenreVehiculeComponent;
  let fixture: ComponentFixture<DeleteGenreVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteGenreVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGenreVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
