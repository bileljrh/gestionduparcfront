import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTvaComponent} from './new-tva.component';

describe('NewTvaComponent', () => {
  let component: NewTvaComponent;
  let fixture: ComponentFixture<NewTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTvaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
