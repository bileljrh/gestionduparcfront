import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteLieuParkingComponent} from './delete-lieu-parking.component';

describe('DeleteLieuParkingComponent', () => {
  let component: DeleteLieuParkingComponent;
  let fixture: ComponentFixture<DeleteLieuParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteLieuParkingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLieuParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
