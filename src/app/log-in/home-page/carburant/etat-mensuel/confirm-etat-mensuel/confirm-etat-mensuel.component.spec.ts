import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmEtatMensuelComponent} from './confirm-etat-mensuel.component';

describe('ConfirmEtatMensuelComponent', () => {
  let component: ConfirmEtatMensuelComponent;
  let fixture: ComponentFixture<ConfirmEtatMensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmEtatMensuelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEtatMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
