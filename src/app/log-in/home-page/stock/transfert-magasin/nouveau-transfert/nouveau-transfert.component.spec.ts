import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauTransfertComponent } from './nouveau-transfert.component';

describe('NouveauTransfertComponent', () => {
  let component: NouveauTransfertComponent;
  let fixture: ComponentFixture<NouveauTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
