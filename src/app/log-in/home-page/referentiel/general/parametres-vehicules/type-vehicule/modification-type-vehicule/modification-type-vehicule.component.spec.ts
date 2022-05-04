import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationTypeVehiculeComponent} from './modification-type-vehicule.component';

describe('ModificationTypeVehiculeComponent', () => {
  let component: ModificationTypeVehiculeComponent;
  let fixture: ComponentFixture<ModificationTypeVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationTypeVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationTypeVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
