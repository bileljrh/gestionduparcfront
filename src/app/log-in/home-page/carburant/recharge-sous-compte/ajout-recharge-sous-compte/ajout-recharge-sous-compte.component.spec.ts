import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRechargeSousCompteComponent } from './ajout-recharge-sous-compte.component';

describe('AjoutRechargeSousCompteComponent', () => {
  let component: AjoutRechargeSousCompteComponent;
  let fixture: ComponentFixture<AjoutRechargeSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutRechargeSousCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRechargeSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
