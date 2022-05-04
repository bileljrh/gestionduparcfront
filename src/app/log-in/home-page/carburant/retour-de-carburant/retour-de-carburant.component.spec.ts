import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RetourDeCarburantComponent} from './retour-de-carburant.component';

describe('RetourDeCarburantComponent', () => {
  let component: RetourDeCarburantComponent;
  let fixture: ComponentFixture<RetourDeCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetourDeCarburantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourDeCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
