import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EtatMensuelComponent} from './etat-mensuel.component';

describe('EtatMensuelComponent', () => {
  let component: EtatMensuelComponent;
  let fixture: ComponentFixture<EtatMensuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtatMensuelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
