import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDeclarationsPerteCarteAgilisCashComponent} from './confirm-declarations-perte-carte-agilis-cash.component';

describe('ConfirmDeclarationsPerteCarteAgilisCashComponent', () => {
  let component: ConfirmDeclarationsPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<ConfirmDeclarationsPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeclarationsPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeclarationsPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
