import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteStructureAdministrativeComponent} from './delete-structure-administrative.component';

describe('DeleteStructureAdministrativeComponent', () => {
  let component: DeleteStructureAdministrativeComponent;
  let fixture: ComponentFixture<DeleteStructureAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteStructureAdministrativeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStructureAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
