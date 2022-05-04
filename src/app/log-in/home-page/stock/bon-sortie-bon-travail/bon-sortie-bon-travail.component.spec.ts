import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BonSortieBonTravailComponent} from './bon-sortie-bon-travail.component';

describe('BonSortieBonTravailComponent', () => {
  let component: BonSortieBonTravailComponent;
  let fixture: ComponentFixture<BonSortieBonTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BonSortieBonTravailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonSortieBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
