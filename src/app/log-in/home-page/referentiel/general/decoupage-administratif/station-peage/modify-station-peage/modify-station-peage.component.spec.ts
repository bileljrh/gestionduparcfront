import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyStationPeageComponent} from './modify-station-peage.component';

describe('ModifyStationPayageComponent', () => {
  let component: ModifyStationPeageComponent;
  let fixture: ComponentFixture<ModifyStationPeageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyStationPeageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyStationPeageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
