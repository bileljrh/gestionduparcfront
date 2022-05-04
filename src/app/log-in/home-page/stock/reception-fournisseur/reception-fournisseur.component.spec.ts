import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReceptionFournisseurComponent} from './reception-fournisseur.component';

describe('ReceptionFournisseurComponent', () => {
  let component: ReceptionFournisseurComponent;
  let fixture: ComponentFixture<ReceptionFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionFournisseurComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
