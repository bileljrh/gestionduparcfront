import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationBonTravailComponent } from './operation-bon-travail.component';

describe('OperationBonTravailComponent', () => {
  let component: OperationBonTravailComponent;
  let fixture: ComponentFixture<OperationBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
