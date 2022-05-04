import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewExpertComponent} from './new-expert.component';

describe('NewExpertComponent', () => {
  let component: NewExpertComponent;
  let fixture: ComponentFixture<NewExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewExpertComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
