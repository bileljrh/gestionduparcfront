import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransfertVersStructureComponent} from './transfert-vers-structure.component';

describe('TransfertVersStructureComponent', () => {
  let component: TransfertVersStructureComponent;
  let fixture: ComponentFixture<TransfertVersStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransfertVersStructureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertVersStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
