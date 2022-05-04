import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleFamilleOperationReparationComponent} from './nouvelle-famille-operation-reparation.component';

describe('NouvelleFamilleOperationReparationComponent', () => {
  let component: NouvelleFamilleOperationReparationComponent;
  let fixture: ComponentFixture<NouvelleFamilleOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleFamilleOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleFamilleOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
