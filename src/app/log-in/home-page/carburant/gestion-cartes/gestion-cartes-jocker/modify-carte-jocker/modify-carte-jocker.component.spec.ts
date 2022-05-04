import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyCarteJockerComponent} from './modify-carte-jocker.component';

describe('ModifyCarteJockerComponent', () => {
  let component: ModifyCarteJockerComponent;
  let fixture: ComponentFixture<ModifyCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
