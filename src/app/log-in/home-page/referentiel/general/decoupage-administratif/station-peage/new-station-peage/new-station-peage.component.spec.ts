import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewStationPeageComponent} from './new-station-peage.component';

describe('NewStationPayageComponent', () => {
  let component: NewStationPeageComponent;
  let fixture: ComponentFixture<NewStationPeageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewStationPeageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStationPeageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
