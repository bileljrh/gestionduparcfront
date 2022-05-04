import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAffectationCartePlafondComponent } from './new-affectation-carte-plafond.component';

describe('NewAffectationCartePlafondComponent', () => {
  let component: NewAffectationCartePlafondComponent;
  let fixture: ComponentFixture<NewAffectationCartePlafondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAffectationCartePlafondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
