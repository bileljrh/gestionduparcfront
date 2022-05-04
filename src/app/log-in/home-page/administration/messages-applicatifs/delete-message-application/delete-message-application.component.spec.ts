import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteMessageApplicationComponent} from './delete-message-application.component';

describe('DeleteMessageApplicationComponent', () => {
  let component: DeleteMessageApplicationComponent;
  let fixture: ComponentFixture<DeleteMessageApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteMessageApplicationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMessageApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
