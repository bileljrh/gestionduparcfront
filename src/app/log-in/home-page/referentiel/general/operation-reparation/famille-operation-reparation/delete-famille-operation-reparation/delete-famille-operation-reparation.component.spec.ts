import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteFamilleOperationReparationComponent} from './delete-famille-operation-reparation.component';

describe('DeleteFamilleOperationReparationComponent', () => {
  let component: DeleteFamilleOperationReparationComponent;
  let fixture: ComponentFixture<DeleteFamilleOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFamilleOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFamilleOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
