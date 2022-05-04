import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauTransfertRotationNullComponent } from './nouveau-transfert-rotation-null.component';

describe('NouveauTransfertRotationNullComponent', () => {
  let component: NouveauTransfertRotationNullComponent;
  let fixture: ComponentFixture<NouveauTransfertRotationNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauTransfertRotationNullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauTransfertRotationNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
