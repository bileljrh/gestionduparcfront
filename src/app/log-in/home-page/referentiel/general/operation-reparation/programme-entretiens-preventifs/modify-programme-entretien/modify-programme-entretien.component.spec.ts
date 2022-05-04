import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyProgrammeEntretienComponent} from './modify-programme-entretien.component';

describe('ModifyProgrammeEntretienComponent', () => {
  let component: ModifyProgrammeEntretienComponent;
  let fixture: ComponentFixture<ModifyProgrammeEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyProgrammeEntretienComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProgrammeEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
