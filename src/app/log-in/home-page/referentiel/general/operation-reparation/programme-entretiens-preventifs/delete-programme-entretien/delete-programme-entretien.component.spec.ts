import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteProgrammeEntretienComponent} from './delete-programme-entretien.component';

describe('DeleteProgrammeEntretienComponent', () => {
  let component: DeleteProgrammeEntretienComponent;
  let fixture: ComponentFixture<DeleteProgrammeEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProgrammeEntretienComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProgrammeEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
