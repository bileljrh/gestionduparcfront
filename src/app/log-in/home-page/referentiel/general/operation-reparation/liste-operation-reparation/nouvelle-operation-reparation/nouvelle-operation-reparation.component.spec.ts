import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleOperationReparationComponent} from './nouvelle-operation-reparation.component';

describe('NouvelleOperationReparationComponent', () => {
  let component: NouvelleOperationReparationComponent;
  let fixture: ComponentFixture<NouvelleOperationReparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleOperationReparationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleOperationReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
