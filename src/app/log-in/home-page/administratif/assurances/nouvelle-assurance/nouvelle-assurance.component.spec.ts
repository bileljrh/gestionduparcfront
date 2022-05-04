import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleAssuranceComponent} from './nouvelle-assurance.component';

describe('NouvelleAssuranceComponent', () => {
  let component: NouvelleAssuranceComponent;
  let fixture: ComponentFixture<NouvelleAssuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleAssuranceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
