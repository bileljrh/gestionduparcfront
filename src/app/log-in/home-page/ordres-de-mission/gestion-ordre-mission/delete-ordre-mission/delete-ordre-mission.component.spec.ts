import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteOrdreMissionComponent} from './delete-ordre-mission.component';

describe('DeleteOrdreMissionComponent', () => {
  let component: DeleteOrdreMissionComponent;
  let fixture: ComponentFixture<DeleteOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteOrdreMissionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
