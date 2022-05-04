import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewAccompagnonsComponent} from './new-accompagnons.component';

describe('NewAccompagnonsComponent', () => {
  let component: NewAccompagnonsComponent;
  let fixture: ComponentFixture<NewAccompagnonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAccompagnonsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccompagnonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
