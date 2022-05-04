import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteTypeVehiculeComponent} from './delete-type-vehicule.component';

describe('DeleteTypeVehiculeComponent', () => {
  let component: DeleteTypeVehiculeComponent;
  let fixture: ComponentFixture<DeleteTypeVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTypeVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTypeVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
