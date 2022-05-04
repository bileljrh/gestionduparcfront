import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationQuantiteBonTravailComponent } from './modification-quantite-bon-travail.component';

describe('ModificationQuantiteBonTravailComponent', () => {
  let component: ModificationQuantiteBonTravailComponent;
  let fixture: ComponentFixture<ModificationQuantiteBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationQuantiteBonTravailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationQuantiteBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
