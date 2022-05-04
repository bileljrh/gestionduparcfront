import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ESmaintenanceReparationComponent} from './esmaintenance-reparation.component';

describe('ESmaintenanceReparationComponent', () => {
  let component: ESmaintenanceReparationComponent;
  let fixture: ComponentFixture<ESmaintenanceReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ESmaintenanceReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESmaintenanceReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
