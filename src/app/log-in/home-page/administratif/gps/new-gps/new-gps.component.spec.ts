import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewGPSComponent} from './new-gps.component';

describe('NewGPSComponent', () => {
  let component: NewGPSComponent;
  let fixture: ComponentFixture<NewGPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGPSComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
