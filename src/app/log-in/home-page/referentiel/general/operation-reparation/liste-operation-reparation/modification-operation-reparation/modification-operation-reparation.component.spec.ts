import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModificationOperationReparationComponent} from './modification-operation-reparation.component';

describe('ModificationOperationReparationComponent', () => {
  let component: ModificationOperationReparationComponent;
  let fixture: ComponentFixture<ModificationOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
