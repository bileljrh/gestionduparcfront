import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionBonTravailComponent} from './gestion-bon-travail.component';

describe('GestionBonTravailComponent', () => {
  let component: GestionBonTravailComponent;
  let fixture: ComponentFixture<GestionBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionBonTravailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
