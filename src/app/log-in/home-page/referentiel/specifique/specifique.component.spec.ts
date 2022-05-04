import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecifiqueComponent} from './specifique.component';

describe('SpecifiqueComponent', () => {
  let component: SpecifiqueComponent;
  let fixture: ComponentFixture<SpecifiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpecifiqueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
