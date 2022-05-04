import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ParametresApplicationComponent} from './parametres-application.component';

describe('ParametresApplicationComponent', () => {
  let component: ParametresApplicationComponent;
  let fixture: ComponentFixture<ParametresApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParametresApplicationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
