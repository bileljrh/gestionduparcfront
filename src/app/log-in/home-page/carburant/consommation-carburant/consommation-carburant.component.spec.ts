import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsommationCarburantComponent} from './consommation-carburant.component';

describe('ConsommationCarburantComponent', () => {
  let component: ConsommationCarburantComponent;
  let fixture: ComponentFixture<ConsommationCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsommationCarburantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsommationCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
