import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesApplicatifsComponent} from './messages-applicatifs.component';

describe('MessagesApplicatifsComponent', () => {
  let component: MessagesApplicatifsComponent;
  let fixture: ComponentFixture<MessagesApplicatifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesApplicatifsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesApplicatifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
