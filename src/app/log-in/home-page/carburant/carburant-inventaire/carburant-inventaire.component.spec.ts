import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarburantInventaireComponent} from './carburant-inventaire.component';

describe('CarburantInventaireComponent', () => {
  let component: CarburantInventaireComponent;
  let fixture: ComponentFixture<CarburantInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarburantInventaireComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarburantInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
