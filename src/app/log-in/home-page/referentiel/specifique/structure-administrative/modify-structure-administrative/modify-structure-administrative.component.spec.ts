import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyStructureAdministrativeComponent} from './modify-structure-administrative.component';

describe('ModifyStructureAdministrativeComponent', () => {
  let component: ModifyStructureAdministrativeComponent;
  let fixture: ComponentFixture<ModifyStructureAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyStructureAdministrativeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyStructureAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
