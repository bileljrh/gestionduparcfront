import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarteJockerComponent} from './carte-jocker.component';

describe('CarteJockerComponent', () => {
  let component: CarteJockerComponent;
  let fixture: ComponentFixture<CarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
