import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionOrdreMissionComponent} from './gestion-ordre-mission.component';

describe('GestionOrdreMissionComponent', () => {
  let component: GestionOrdreMissionComponent;
  let fixture: ComponentFixture<GestionOrdreMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionOrdreMissionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
