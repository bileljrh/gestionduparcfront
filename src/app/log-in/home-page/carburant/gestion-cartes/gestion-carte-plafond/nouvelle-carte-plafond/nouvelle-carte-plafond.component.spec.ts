import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleCartePlafondComponent} from './nouvelle-carte-plafond.component';

describe('NouvelleCartePlafondComponent', () => {
  let component: NouvelleCartePlafondComponent;
  let fixture: ComponentFixture<NouvelleCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
