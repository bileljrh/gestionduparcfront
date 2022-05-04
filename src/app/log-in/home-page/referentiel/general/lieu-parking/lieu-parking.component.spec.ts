import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LieuParkingComponent} from './lieu-parking.component';

describe('LieuParkingComponent', () => {
  let component: LieuParkingComponent;
  let fixture: ComponentFixture<LieuParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LieuParkingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
