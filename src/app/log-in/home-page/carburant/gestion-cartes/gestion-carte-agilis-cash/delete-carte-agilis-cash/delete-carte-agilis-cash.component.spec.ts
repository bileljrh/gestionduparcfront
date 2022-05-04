import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteCarteAgilisCashComponent} from './delete-carte-agilis-cash.component';

describe('DeleteCarteAgilisCashComponent', () => {
  let component: DeleteCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeleteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
