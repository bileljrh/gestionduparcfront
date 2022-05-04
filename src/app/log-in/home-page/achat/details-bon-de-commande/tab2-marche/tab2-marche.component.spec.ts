import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Tab2MarcheComponent} from './tab2-marche.component';

describe('Tab2MarcheComponent', () => {
  let component: Tab2MarcheComponent;
  let fixture: ComponentFixture<Tab2MarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2MarcheComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab2MarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
