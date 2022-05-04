import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarteAgilisCashComponent} from './carte-agilis-cash.component';

describe('CarteAgilisCashComponent', () => {
  let component: CarteAgilisCashComponent;
  let fixture: ComponentFixture<CarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
