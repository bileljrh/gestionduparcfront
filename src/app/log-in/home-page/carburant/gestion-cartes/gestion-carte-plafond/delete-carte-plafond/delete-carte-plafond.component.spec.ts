import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteCartePlafondComponent} from './delete-carte-plafond.component';

describe('DeleteCartePlafondComponent', () => {
  let component: DeleteCartePlafondComponent;
  let fixture: ComponentFixture<DeleteCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
