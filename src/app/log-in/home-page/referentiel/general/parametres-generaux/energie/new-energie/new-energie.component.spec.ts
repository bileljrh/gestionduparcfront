import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewEnergieComponent} from './new-energie.component';

describe('NewEnergieComponent', () => {
  let component: NewEnergieComponent;
  let fixture: ComponentFixture<NewEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEnergieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
