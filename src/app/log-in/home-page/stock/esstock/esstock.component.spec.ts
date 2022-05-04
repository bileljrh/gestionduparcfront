import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ESstockComponent} from './esstock.component';

describe('ESstockComponent', () => {
  let component: ESstockComponent;
  let fixture: ComponentFixture<ESstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ESstockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
