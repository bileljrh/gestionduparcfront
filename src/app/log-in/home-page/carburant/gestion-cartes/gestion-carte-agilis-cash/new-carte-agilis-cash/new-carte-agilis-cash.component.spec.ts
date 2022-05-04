import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCarteAgilisCashComponent} from './new-carte-agilis-cash.component';

describe('NewCarteAgilisCashComponent', () => {
  let component: NewCarteAgilisCashComponent;
  let fixture: ComponentFixture<NewCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
