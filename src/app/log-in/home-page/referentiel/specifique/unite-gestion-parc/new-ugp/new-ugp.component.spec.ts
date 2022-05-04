import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewUGPComponent} from './new-ugp.component';

describe('NewUGPComponent', () => {
  let component: NewUGPComponent;
  let fixture: ComponentFixture<NewUGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUGPComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
