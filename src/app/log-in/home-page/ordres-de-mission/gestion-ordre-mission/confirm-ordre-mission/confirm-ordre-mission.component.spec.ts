import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmOrdreMissionComponent} from './confirm-ordre-mission.component';

describe('ConfirmOrdreMissionComponent', () => {
  let component: ConfirmOrdreMissionComponent;
  let fixture: ComponentFixture<ConfirmOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmOrdreMissionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
