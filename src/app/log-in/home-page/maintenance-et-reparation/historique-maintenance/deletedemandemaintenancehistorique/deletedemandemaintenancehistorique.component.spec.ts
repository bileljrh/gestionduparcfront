import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedemandemaintenancehistoriqueComponent } from './deletedemandemaintenancehistorique.component';

describe('DeletedemandemaintenancehistoriqueComponent', () => {
  let component: DeletedemandemaintenancehistoriqueComponent;
  let fixture: ComponentFixture<DeletedemandemaintenancehistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedemandemaintenancehistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedemandemaintenancehistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
