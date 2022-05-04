import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTaxeDeCirculationComponent} from './new-taxe-de-circulation.component';

describe('NewTaxeDeCirculationComponent', () => {
  let component: NewTaxeDeCirculationComponent;
  let fixture: ComponentFixture<NewTaxeDeCirculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaxeDeCirculationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaxeDeCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
