import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewProgrammeEntretienComponent} from './new-programme-entretien.component';

describe('NewProgrammeEntretienComponent', () => {
  let component: NewProgrammeEntretienComponent;
  let fixture: ComponentFixture<NewProgrammeEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProgrammeEntretienComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProgrammeEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
