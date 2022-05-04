import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RetourStructureComponent} from './retour-structure.component';

describe('RetourStructureComponent', () => {
  let component: RetourStructureComponent;
  let fixture: ComponentFixture<RetourStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetourStructureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
