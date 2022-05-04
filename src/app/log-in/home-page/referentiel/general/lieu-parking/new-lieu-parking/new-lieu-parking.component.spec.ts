import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewLieuParkingComponent} from './new-lieu-parking.component';

describe('NewLieuParkingComponent', () => {
  let component: NewLieuParkingComponent;
  let fixture: ComponentFixture<NewLieuParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewLieuParkingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLieuParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
