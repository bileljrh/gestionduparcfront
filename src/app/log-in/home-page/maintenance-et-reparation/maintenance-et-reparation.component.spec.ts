import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MaintenanceEtReparationComponent} from './maintenance-et-reparation.component';

describe('MaintenanceEtReparationComponent', () => {
  let component: MaintenanceEtReparationComponent;
  let fixture: ComponentFixture<MaintenanceEtReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceEtReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceEtReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
