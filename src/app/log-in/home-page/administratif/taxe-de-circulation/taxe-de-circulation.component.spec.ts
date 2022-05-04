import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaxeDeCirculationComponent} from './taxe-de-circulation.component';

describe('TaxeDeCirculationComponent', () => {
  let component: TaxeDeCirculationComponent;
  let fixture: ComponentFixture<TaxeDeCirculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxeDeCirculationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxeDeCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
