import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationFamilleOperationReparationComponent} from './modification-famille-operation-reparation.component';

describe('ModificationFamilleOperationReparationComponent', () => {
  let component: ModificationFamilleOperationReparationComponent;
  let fixture: ComponentFixture<ModificationFamilleOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationFamilleOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationFamilleOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
