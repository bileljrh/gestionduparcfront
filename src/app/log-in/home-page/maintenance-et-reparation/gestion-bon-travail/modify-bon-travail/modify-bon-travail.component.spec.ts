import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBonTravailComponent } from './modify-bon-travail.component';

describe('ModifyBonTravailComponent', () => {
  let component: ModifyBonTravailComponent;
  let fixture: ComponentFixture<ModifyBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
