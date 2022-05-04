import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReformeEtSortieDeCompteComponent} from './reforme-et-sortie-de-compte.component';

describe('ReformeEtSortieDeCompteComponent', () => {
  let component: ReformeEtSortieDeCompteComponent;
  let fixture: ComponentFixture<ReformeEtSortieDeCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReformeEtSortieDeCompteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReformeEtSortieDeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
