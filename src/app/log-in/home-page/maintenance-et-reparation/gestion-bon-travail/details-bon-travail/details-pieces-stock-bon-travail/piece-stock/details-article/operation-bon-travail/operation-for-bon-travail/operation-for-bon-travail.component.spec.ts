import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationForBonTravailComponent } from './operation-for-bon-travail.component';

describe('OperationForBonTravailComponent', () => {
  let component: OperationForBonTravailComponent;
  let fixture: ComponentFixture<OperationForBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationForBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationForBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
