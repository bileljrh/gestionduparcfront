import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationInventaireComponent } from './notification-inventaire.component';

describe('NotificationInventaireComponent', () => {
  let component: NotificationInventaireComponent;
  let fixture: ComponentFixture<NotificationInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationInventaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
