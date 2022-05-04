import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteOperationReparationComponent} from './delete-operation-reparation.component';

describe('DeleteOperationReparationComponent', () => {
  let component: DeleteOperationReparationComponent;
  let fixture: ComponentFixture<DeleteOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
