import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonSortieBonTravailComponent } from './details-bon-sortie-bon-travail.component';

describe('DetailsBonSortieBonTravailComponent', () => {
  let component: DetailsBonSortieBonTravailComponent;
  let fixture: ComponentFixture<DetailsBonSortieBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBonSortieBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonSortieBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
