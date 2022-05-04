import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuDemandeComponent } from './recu-demande.component';

describe('RecuDemandeComponent', () => {
  let component: RecuDemandeComponent;
  let fixture: ComponentFixture<RecuDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
