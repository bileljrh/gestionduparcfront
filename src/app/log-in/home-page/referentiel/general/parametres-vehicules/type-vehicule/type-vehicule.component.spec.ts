import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TypeVehiculeComponent} from './type-vehicule.component';

describe('TypeVehiculeComponent', () => {
  let component: TypeVehiculeComponent;
  let fixture: ComponentFixture<TypeVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypeVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
