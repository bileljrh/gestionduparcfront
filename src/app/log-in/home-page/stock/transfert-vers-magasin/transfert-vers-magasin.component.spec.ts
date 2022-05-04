import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransfertVersMagasinComponent} from './transfert-vers-magasin.component';

describe('TransfertVersMagasinComponent', () => {
  let component: TransfertVersMagasinComponent;
  let fixture: ComponentFixture<TransfertVersMagasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertVersMagasinComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertVersMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
