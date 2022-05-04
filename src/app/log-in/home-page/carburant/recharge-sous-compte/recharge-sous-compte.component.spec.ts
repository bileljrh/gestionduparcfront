import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeSousCompteComponent } from './recharge-sous-compte.component';

describe('RechargeSousCompteComponent', () => {
  let component: RechargeSousCompteComponent;
  let fixture: ComponentFixture<RechargeSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeSousCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
