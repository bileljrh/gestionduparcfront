import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionCartePlafondComponent} from './gestion-carte-plafond.component';

describe('GestionCartePlafondComponent', () => {
  let component: GestionCartePlafondComponent;
  let fixture: ComponentFixture<GestionCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
