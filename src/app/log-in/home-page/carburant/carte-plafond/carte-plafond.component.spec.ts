import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartePlafondComponent} from './carte-plafond.component';

describe('CartePlafondComponent', () => {
  let component: CartePlafondComponent;
  let fixture: ComponentFixture<CartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
