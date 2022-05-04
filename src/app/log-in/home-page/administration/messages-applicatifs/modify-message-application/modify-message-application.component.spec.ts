import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyMessageApplicationComponent} from './modify-message-application.component';

describe('ModifyMessageApplicationComponent', () => {
  let component: ModifyMessageApplicationComponent;
  let fixture: ComponentFixture<ModifyMessageApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyMessageApplicationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMessageApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
