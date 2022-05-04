import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteEnergieComponent} from './delete-energie.component';

describe('DeleteEnergieComponent', () => {
  let component: DeleteEnergieComponent;
  let fixture: ComponentFixture<DeleteEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEnergieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
