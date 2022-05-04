import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OperationReparationComponent} from './operation-reparation.component';

describe('OperationReparationComponent', () => {
  let component: OperationReparationComponent;
  let fixture: ComponentFixture<OperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
