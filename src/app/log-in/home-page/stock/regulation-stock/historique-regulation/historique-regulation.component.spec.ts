import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRegulationComponent } from './historique-regulation.component';

describe('HistoriqueRegulationComponent', () => {
  let component: HistoriqueRegulationComponent;
  let fixture: ComponentFixture<HistoriqueRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueRegulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
