import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyVehiculeComponent} from './modify-vehicule.component';

describe('ModifyVehiculeComponent', () => {
  let component: ModifyVehiculeComponent;
  let fixture: ComponentFixture<ModifyVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyVehiculeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
