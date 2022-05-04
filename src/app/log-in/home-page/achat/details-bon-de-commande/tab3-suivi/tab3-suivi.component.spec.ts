import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Tab3SuiviComponent} from './tab3-suivi.component';

describe('Tab3SuiviComponent', () => {
  let component: Tab3SuiviComponent;
  let fixture: ComponentFixture<Tab3SuiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3SuiviComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab3SuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
