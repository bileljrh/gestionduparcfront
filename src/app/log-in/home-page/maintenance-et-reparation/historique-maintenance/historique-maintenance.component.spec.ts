import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMaintenanceComponent } from './historique-maintenance.component';

describe('HistoriqueMaintenanceComponent', () => {
  let component: HistoriqueMaintenanceComponent;
  let fixture: ComponentFixture<HistoriqueMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
