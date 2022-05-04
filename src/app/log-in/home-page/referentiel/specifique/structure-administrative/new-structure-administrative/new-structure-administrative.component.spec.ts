import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewStructureAdministrativeComponent} from './new-structure-administrative.component';

describe('NewStructureAdministrativeComponent', () => {
  let component: NewStructureAdministrativeComponent;
  let fixture: ComponentFixture<NewStructureAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewStructureAdministrativeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStructureAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
