import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyAnneeComponent} from './modify-annee.component';

describe('ModifyAnneeComponent', () => {
  let component: ModifyAnneeComponent;
  let fixture: ComponentFixture<ModifyAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyAnneeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
