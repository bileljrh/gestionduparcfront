import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeOperationReparationComponent} from './liste-operation-reparation.component';

describe('ListeOperationReparationComponent', () => {
  let component: ListeOperationReparationComponent;
  let fixture: ComponentFixture<ListeOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListeOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
