import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdresDeMissionComponent} from './ordres-de-mission.component';

describe('OrdresDeMissionComponent', () => {
  let component: OrdresDeMissionComponent;
  let fixture: ComponentFixture<OrdresDeMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdresDeMissionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdresDeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
