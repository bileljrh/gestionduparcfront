import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHistoriqueRegulationComponent } from './delete-historique-regulation.component';

describe('DeleteHistoriqueRegulationComponent', () => {
  let component: DeleteHistoriqueRegulationComponent;
  let fixture: ComponentFixture<DeleteHistoriqueRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHistoriqueRegulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
