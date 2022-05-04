import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransfertMagasinComponent} from './transfert-magasin.component';

describe('TransfertMagasinComponent', () => {
  let component: TransfertMagasinComponent;
  let fixture: ComponentFixture<TransfertMagasinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertMagasinComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
