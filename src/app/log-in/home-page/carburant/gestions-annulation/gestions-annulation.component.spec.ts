import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionsAnnulationComponent } from './gestions-annulation.component';

describe('GestionsAnnulationComponent', () => {
  let component: GestionsAnnulationComponent;
  let fixture: ComponentFixture<GestionsAnnulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionsAnnulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionsAnnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
