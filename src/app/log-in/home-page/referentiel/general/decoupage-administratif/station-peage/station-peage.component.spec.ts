import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StationPeageComponent} from './station-peage.component';

describe('StationPayageComponent', () => {
  let component: StationPeageComponent;
  let fixture: ComponentFixture<StationPeageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationPeageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationPeageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
