import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewBonTravailComponent} from './new-bon-travail.component';

describe('NewBonTravailComponent', () => {
  let component: NewBonTravailComponent;
  let fixture: ComponentFixture<NewBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBonTravailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
