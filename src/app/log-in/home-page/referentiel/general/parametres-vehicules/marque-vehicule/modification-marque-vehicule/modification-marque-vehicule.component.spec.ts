import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationMarqueVehiculeComponent} from './modification-marque-vehicule.component';

describe('ModificationMarqueVehiculeComponent', () => {
  let component: ModificationMarqueVehiculeComponent;
  let fixture: ComponentFixture<ModificationMarqueVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationMarqueVehiculeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationMarqueVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
