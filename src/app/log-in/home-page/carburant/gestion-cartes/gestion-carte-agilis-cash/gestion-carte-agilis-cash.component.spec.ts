import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionCarteAgilisCashComponent} from './gestion-carte-agilis-cash.component';

describe('GestionCarteAgilisCashComponent', () => {
  let component: GestionCarteAgilisCashComponent;
  let fixture: ComponentFixture<GestionCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
