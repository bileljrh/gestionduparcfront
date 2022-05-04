import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyPersonnelComponent} from './modify-personnel.component';

describe('ModifyPersonnelComponent', () => {
  let component: ModifyPersonnelComponent;
  let fixture: ComponentFixture<ModifyPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyPersonnelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
