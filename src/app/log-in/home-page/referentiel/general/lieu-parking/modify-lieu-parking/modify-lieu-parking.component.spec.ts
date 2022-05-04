import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyLieuParkingComponent} from './modify-lieu-parking.component';

describe('ModifyLieuParkingComponent', () => {
  let component: ModifyLieuParkingComponent;
  let fixture: ComponentFixture<ModifyLieuParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyLieuParkingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyLieuParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
