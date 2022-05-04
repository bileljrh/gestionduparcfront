import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyOrdreMissionComponent} from './modify-ordre-mission.component';

describe('ModifyOrdreMissionComponent', () => {
  let component: ModifyOrdreMissionComponent;
  let fixture: ComponentFixture<ModifyOrdreMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyOrdreMissionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
