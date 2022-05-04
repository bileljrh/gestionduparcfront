import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionCartesJockerComponent} from './gestion-cartes-jocker.component';

describe('GestionCartesJockerComponent', () => {
  let component: GestionCartesJockerComponent;
  let fixture: ComponentFixture<GestionCartesJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCartesJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCartesJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
