import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgrammeEntretiensPreventifsComponent} from './programme-entretiens-preventifs.component';

describe('ProgrammeEntretiensPreventifsComponent', () => {
  let component: ProgrammeEntretiensPreventifsComponent;
  let fixture: ComponentFixture<ProgrammeEntretiensPreventifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgrammeEntretiensPreventifsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeEntretiensPreventifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
