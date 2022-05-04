import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDemandeInterventionComponent} from './delete-demande-intervention.component';

describe('DeleteDemandeInterventionComponent', () => {
  let component: DeleteDemandeInterventionComponent;
  let fixture: ComponentFixture<DeleteDemandeInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDemandeInterventionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemandeInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
