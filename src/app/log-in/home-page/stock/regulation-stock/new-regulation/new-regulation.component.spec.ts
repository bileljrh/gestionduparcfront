import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegulationComponent } from './new-regulation.component';

describe('NewRegulationComponent', () => {
  let component: NewRegulationComponent;
  let fixture: ComponentFixture<NewRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
