import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransfertDeParkAParcComponent} from './transfert-de-park-aparc.component';

describe('TransfertDeParkAParcComponent', () => {
  let component: TransfertDeParkAParcComponent;
  let fixture: ComponentFixture<TransfertDeParkAParcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertDeParkAParcComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertDeParkAParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
