import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleReformeComponent} from './nouvelle-reforme.component';

describe('NouvelleReformeComponent', () => {
  let component: NouvelleReformeComponent;
  let fixture: ComponentFixture<NouvelleReformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleReformeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
