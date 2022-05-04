import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReceptionAtelierComponent} from './reception-atelier.component';

describe('ReceptionAtelierComponent', () => {
  let component: ReceptionAtelierComponent;
  let fixture: ComponentFixture<ReceptionAtelierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionAtelierComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
