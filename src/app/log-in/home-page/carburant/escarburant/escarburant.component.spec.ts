import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EScarburantComponent} from './escarburant.component';

describe('EScarburantComponent', () => {
  let component: EScarburantComponent;
  let fixture: ComponentFixture<EScarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EScarburantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EScarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
