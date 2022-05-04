import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAnneeComponent} from './new-annee.component';

describe('NewAnneeComponent', () => {
  let component: NewAnneeComponent;
  let fixture: ComponentFixture<NewAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAnneeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
