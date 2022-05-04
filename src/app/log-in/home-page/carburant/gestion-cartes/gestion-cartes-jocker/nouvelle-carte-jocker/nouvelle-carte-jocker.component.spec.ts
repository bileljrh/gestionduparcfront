import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleCarteJockerComponent} from './nouvelle-carte-jocker.component';

describe('NouvelleCarteJockerComponent', () => {
  let component: NouvelleCarteJockerComponent;
  let fixture: ComponentFixture<NouvelleCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
