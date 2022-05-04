import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidateEtatMensuelComponent} from './validate-etat-mensuel.component';

describe('ValidateEtatMensuelComponent', () => {
  let component: ValidateEtatMensuelComponent;
  let fixture: ComponentFixture<ValidateEtatMensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateEtatMensuelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateEtatMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
