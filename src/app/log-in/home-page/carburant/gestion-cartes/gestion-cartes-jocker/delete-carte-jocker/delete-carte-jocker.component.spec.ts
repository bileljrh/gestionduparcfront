import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteCarteJockerComponent} from './delete-carte-jocker.component';

describe('DeleteCarteJockerComponent', () => {
  let component: DeleteCarteJockerComponent;
  let fixture: ComponentFixture<DeleteCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
