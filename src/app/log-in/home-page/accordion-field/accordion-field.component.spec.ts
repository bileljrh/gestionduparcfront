import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccordionFieldComponent} from './accordion-field.component';

describe('AccordionFieldComponent', () => {
  let component: AccordionFieldComponent;
  let fixture: ComponentFixture<AccordionFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
