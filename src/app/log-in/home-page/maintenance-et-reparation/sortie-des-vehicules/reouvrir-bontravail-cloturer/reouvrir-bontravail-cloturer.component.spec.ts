import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReouvrirBontravailCloturerComponent } from './reouvrir-bontravail-cloturer.component';

describe('ReouvrirBontravailCloturerComponent', () => {
  let component: ReouvrirBontravailCloturerComponent;
  let fixture: ComponentFixture<ReouvrirBontravailCloturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReouvrirBontravailCloturerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReouvrirBontravailCloturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
