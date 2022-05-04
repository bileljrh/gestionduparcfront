import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReceptionBonsCarburantsComponent} from './reception-bons-carburants.component';

describe('ReceptionBonsCarburantsComponent', () => {
  let component: ReceptionBonsCarburantsComponent;
  let fixture: ComponentFixture<ReceptionBonsCarburantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionBonsCarburantsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionBonsCarburantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
