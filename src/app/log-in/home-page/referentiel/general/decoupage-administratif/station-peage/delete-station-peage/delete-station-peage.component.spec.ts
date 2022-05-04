import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteStationPeageComponent} from './delete-station-peage.component';

describe('DeleteStationPayageComponent', () => {
  let component: DeleteStationPeageComponent;
  let fixture: ComponentFixture<DeleteStationPeageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteStationPeageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStationPeageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
