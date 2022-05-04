import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewMessageApplicationComponent} from './new-message-application.component';

describe('NewMessageApplicationComponent', () => {
  let component: NewMessageApplicationComponent;
  let fixture: ComponentFixture<NewMessageApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMessageApplicationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
