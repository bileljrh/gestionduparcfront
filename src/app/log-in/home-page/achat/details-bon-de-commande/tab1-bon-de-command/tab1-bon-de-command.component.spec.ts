import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Tab1BonDeCommandComponent} from './tab1-bon-de-command.component';

describe('Tab1BonDeCommandComponent', () => {
  let component: Tab1BonDeCommandComponent;
  let fixture: ComponentFixture<Tab1BonDeCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1BonDeCommandComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1BonDeCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
