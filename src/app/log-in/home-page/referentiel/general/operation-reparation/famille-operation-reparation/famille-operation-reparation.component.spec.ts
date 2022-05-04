import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FamilleOperationReparationComponent} from './famille-operation-reparation.component';

describe('FamilleOperationReparationComponent', () => {
  let component: FamilleOperationReparationComponent;
  let fixture: ComponentFixture<FamilleOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FamilleOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilleOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
